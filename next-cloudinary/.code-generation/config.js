/**
 * Code generation config for next-cloudinary.
 * The CSS service reads this file to generate <CldImage> / <CldVideoPlayer> JSX snippets
 * for the Cloudinary documentation pages.
 *
 * customGenerator(mediaConfig, includeImports) => string
 *   - mediaConfig.actionsDTO       - structured transformation data from Ruby CGS
 *   - mediaConfig.transformation   - raw parsed_url transformation array (always populated)
 *   - mediaConfig.public_id        - Cloudinary public ID
 *   - mediaConfig.resource_type    - "image" | "video"
 *   - includeImports               - whether to prepend the import statement
 *
 * Fallback strategy:
 *   1. actionsDTO → named JSX props for all known transformations
 *   2. mediaConfig.transformation → generative AI effects (Ruby CGS ≤0.1.84 returns
 *      actions:null for e_gen_* — newer versions do return them, but this fallback
 *      makes local dev work against the older CGS docker image too)
 *   3. Unknown effect/adjust groups → rawTransformations["e_{name}:{level}"]
 *      NOTE: rawTransformations reconstruction is correct for Cloudinary e_* params only.
 *      Parameters with a different URL prefix (e.g. o_ for opacity) must be in
 *      EFFECT_PROP_MAP to avoid generating an incorrect raw string.
 */

// ─── Effect map ──────────────────────────────────────────────────────────────
// Cloudinary internal effect name → CldImage prop name.
// Anything NOT in this map goes to rawTransformations.
var EFFECT_PROP_MAP = {
  sepia: 'sepia',
  grayscale: 'grayscale',
  // blur/blur_faces/blur_region: actionsDTO always uses name "blur" with a
  // region qualifier to distinguish variants — handled by special case below.
  blur: 'blur',
  // e_viesus_correct has no CldImage prop — goes to rawTransformations as e_viesus_correct.
  improve: 'improve',
  sharpen: 'sharpen',
  brightness: 'brightness',
  brightness_hsb: 'brightnessHSB',
  contrast: 'contrast',
  saturation: 'saturation',
  vibrance: 'vibrance',
  shadow: 'shadow',
  colorize: 'colorize',
  // opacity uses o_{level} in Cloudinary URLs — must be in this map so we emit
  // `opacity={50}` rather than the incorrect `rawTransformations={["e_opacity:50"]}`
  opacity: 'opacity',
  // pixelate/pixelate_faces/pixelate_region: actionsDTO always uses name "pixelate"
  // with a region qualifier — handled by special case below.
  pixelate: 'pixelate',
  oil_paint: 'oilPaint',
  cartoonify: 'cartoonify',
  outline: 'outline',
  blackwhite: 'blackwhite',
  negate: 'negate',
  // e_redeye → actionsDTO type "red_eye"
  red_eye: 'redeye',
  background_removal: 'removeBackground',
  remove_background: 'removeBackground',
  auto_brightness: 'autoBrightness',
  auto_color: 'autoColor',
  auto_contrast: 'autoContrast',
  assist_colorblind: 'assistColorblind',
  assist_color_blind: 'assistColorblind',
  simulate_colorblind: 'simulateColorblind',
  simulate_color_blind: 'simulateColorblind',
  fill_light: 'fillLight',
  gamma: 'gamma',
  gradient_fade: 'gradientFade',
  multiply: 'multiply',
  replace_color: 'replaceColor',
  screen: 'screen',
  tint: 'tint',
  trim: 'trim',
  unsharp_mask: 'unsharpMask',
  vectorize: 'vectorize',
  vignette: 'vignette',
  // e_art:style → actionsDTO type "artistic_filter", handled by special case below
  artistic_filter: 'art',
  hue: 'hue',
  noise: 'noise',
  // e_loop without parameters → actionsDTO group "animated" — handled by special case below
  // e_loop:2,f_mp4 → actionsDTO group "effect" name "loop" (different code path)
  loop: 'loop',
  shear: 'shear',
  enhance: 'enhance',
  zoompan: 'zoompan',
  displace: 'displace',
};

// actionsDTO internal effect names that differ from Cloudinary URL parameter names.
// Used in the rawTransformations fallback to emit the correct e_{urlName} string.
var EFFECT_URL_NAME_OVERRIDE = {
  // actionsDTO "advanced_red_eye" → URL "e_adv_redeye"
  advanced_red_eye: 'adv_redeye',
};

// actionsDTO uses internal gravity type names; normalize to Cloudinary URL values
var GRAVITY_NORMALIZE = {
  auto_gravity: 'auto',
};

// actionsDTO focus subject names (inside autoGravity) → Cloudinary URL focus values.
// e.g. CGS actionsDTO uses "ocr" but Cloudinary URL is g_auto:ocr_text.
var GRAVITY_FOCUS_NORMALIZE = {
  ocr: 'ocr_text',
};

// actionsDTO background types that the CGS strips the "auto:" prefix from.
// e.g. "b_auto:predominant" → actionsDTO name "predominant" → URL needs "auto:predominant".
var BACKGROUND_URL_NAME = {
  predominant: 'auto:predominant',
  predominant_gradient: 'auto:predominant_gradient',
  border: 'auto:border',
  border_gradient: 'auto:border_gradient',
};

// actionsDTO uses internal SDK crop mode names that differ from the URL shorthand
// codes accepted by CldImage's crop prop (which match the Cloudinary URL params).
var CROP_MODE_NORMALIZE = {
  limit_fill: 'lfill',
  limit_pad:  'lpad',
  minimum_fit: 'mfit',
  minimum_pad: 'mpad',
  thumbnail:  'thumb',
  // limit_fit (c_lfit) has no direct equivalent in the url-loader schema; omit
  // so it falls through as-is rather than silently producing an invalid value.
};

// ─── actionsDTO helpers ───────────────────────────────────────────────────────

/**
 * Walk a qualifier's .qualifiers chain to return the scalar leaf value.
 * Handles simple scalars (width, height, level).
 */
function resolveQualifierValue(q) {
  if (!q) return undefined;
  if (q.value !== undefined) return q.value;
  if (q.qualifiers && q.qualifiers.length > 0) {
    var leaf = q.qualifiers[0];
    while (leaf.qualifiers && leaf.qualifiers.length > 0) {
      leaf = leaf.qualifiers[0];
    }
    return leaf.name;
  }
  return undefined;
}

/**
 * Resolve the gravity qualifier, reconstructing compound auto gravity strings.
 *
 * Simple gravity (e.g. g_faces):
 *   { name:"gravity", qualifiers:[{ name:"faces" }] }  → "faces"
 *
 * Compound auto gravity (e.g. g_auto:face):
 *   { name:"gravity", qualifiers:[{ name:"auto_gravity", qualifiers:[
 *     { name:"auto_focus", qualifiers:[{ name:"focus_on", qualifiers:[{ name:"face" }] }] }
 *   ]}] }  → "auto:face"
 */
function resolveGravityValue(qualifiers) {
  var gravityQ = qualifiers.find(function(q) { return q.name === 'gravity'; });
  if (!gravityQ || !gravityQ.qualifiers || !gravityQ.qualifiers.length) return undefined;

  var typeQual = gravityQ.qualifiers[0]; // e.g. { name: "auto_gravity", qualifiers: [...] }
  var typeName = GRAVITY_NORMALIZE[typeQual.name] || typeQual.name; // "auto" or e.g. "faces"

  // Simple gravity — no nested focus qualifiers
  if (!typeQual.qualifiers || !typeQual.qualifiers.length) return typeName;

  // Compound auto gravity — walk to the leaf focus subject name
  var leaf = typeQual.qualifiers[0];
  while (leaf.qualifiers && leaf.qualifiers.length > 0) {
    leaf = leaf.qualifiers[0];
  }
  var focusName = GRAVITY_FOCUS_NORMALIZE[leaf.name] || leaf.name;
  return typeName === 'auto' && focusName ? 'auto:' + focusName : (focusName || typeName);
}

function makeGetQualifier(qualifiers) {
  return function(qualName) {
    var q = qualifiers.find(function(q) { return q.name === qualName; });
    return resolveQualifierValue(q);
  };
}

// ─── Color qualifier helper ───────────────────────────────────────────────────
//
// Extracts a Cloudinary-compatible color string from an actionsDTO color qualifier.
// Simple color: { group:"color", name:"red" } → "red"
// RGB hex:      { group:"color", name:"rgb", qualifiers:[{ name:"color", value:"#9090ff" }] }
//               → "rgb:9090ff" (hash stripped — Cloudinary URL format)
//
function extractColorString(qual) {
  if (!qual || qual.group !== 'color') return undefined;
  if (qual.name === 'rgb' && qual.qualifiers && qual.qualifiers.length > 0) {
    var hex = qual.qualifiers[0].value;
    if (hex) return 'rgb:' + String(hex).replace('#', '');
  }
  return qual.name || undefined;
}

// ─── actionsDTO → CldImage props ─────────────────────────────────────────────

function mapActionsDTOToImageProps(actionsDTO) {
  var props = {};
  var rawTransformations = [];

  (actionsDTO || []).forEach(function(action) {
    var group = (action.group || '').toLowerCase();
    var name = (action.name || '').toLowerCase();
    var qualifiers = action.qualifiers || [];
    var getQualifier = makeGetQualifier(qualifiers);

    if (group === 'resize') {
      var width = getQualifier('width');
      var height = getQualifier('height');
      var gravity = resolveGravityValue(qualifiers);
      var aspectRatio = getQualifier('aspect_ratio');
      var zoom = getQualifier('zoom');

      var x = getQualifier('x');
      var y = getQualifier('y');

      // actionsDTO uses internal SDK names (e.g. "limit_fill", "thumbnail") while
      // CldImage's crop prop expects the URL shorthand forms ("lfill", "thumb").
      var cropMode = CROP_MODE_NORMALIZE[name] || name;

      // b_auto / b_blurred in the same step as c_pad appear as an embedded
      // background qualifier: { name:"background", qualifiers:[{group:"background",name:"auto"}] }
      var bgQual = qualifiers.find(function(q) { return q.name === 'background'; });
      if (bgQual && bgQual.qualifiers && bgQual.qualifiers.length > 0) {
        var innerBg = bgQual.qualifiers[0]; // {group:"background", name:"auto"|"blurred"|...}
        if (innerBg && innerBg.group === 'background') {
          // b_gen_fill embedded in a resize step is represented as
          // background.color("gen_fill") in actionsDTO (CGS quirk — the CGS treats
          // gen_fill as a color value rather than a generative fill background type).
          // Detect this pattern and emit fillBackground instead of background.
          var innerIsGenFill = innerBg.name === 'color' &&
            innerBg.qualifiers && innerBg.qualifiers.length > 0 &&
            innerBg.qualifiers[0].name === 'gen_fill';
          if (innerIsGenFill) {
            if (!props.fillBackground) props.fillBackground = true;
          } else {
            var bgUrlName = BACKGROUND_URL_NAME[innerBg.name] || innerBg.name;
            var bgStr = bgUrlName;
            if (innerBg.qualifiers && innerBg.qualifiers.length > 0) {
              var bgParams = innerBg.qualifiers.map(function(q) {
                return resolveQualifierValue(q);
              }).filter(function(v) { return v !== undefined && v !== null; });
              if (bgParams.length > 0) bgStr += ':' + bgParams.join(':');
            }
            if (bgStr) props.background = bgStr;
          }
        }
      }

      if (width !== undefined) props.width = width;
      if (height !== undefined) props.height = height;
      if (cropMode !== 'scale') props.crop = cropMode;
      if (gravity !== undefined) props.gravity = gravity;
      if (aspectRatio !== undefined) props.aspectRatio = aspectRatio;
      if (zoom !== undefined) props.zoom = zoom;
      if (x !== undefined) props.x = x;
      if (y !== undefined) props.y = y;

    } else if (group === 'effect' || group === 'adjust' || group === 'animated' || group === 'reshape') {
      // --- Special cases where actionsDTO internal structure needs custom handling ---

      if (name === 'artistic_filter') {
        // e_art:al_dente → actionsDTO: {group:"effect", name:"artistic_filter",
        //   qualifiers:[{group:"artistic_filter", name:"al_dente"}]}
        // The art style name lives in qualifiers[0].name.
        var artStyle = qualifiers.length > 0 ? qualifiers[0].name : undefined;
        if (artStyle) props.art = artStyle;

      } else if (name === 'blur') {
        // e_blur, e_blur_faces, e_blur_region all produce name:"blur" in actionsDTO.
        // The "region" qualifier (type "faces", "ocr", "custom", …) distinguishes them.
        // blur uses "strength" qualifier, not "level".
        var blurStrength = getQualifier('strength') || getQualifier('level');
        var blurRegion = getQualifier('region');
        if (blurRegion === 'faces') {
          props.blurFaces = blurStrength !== undefined ? blurStrength : true;
        } else if (blurRegion !== undefined) {
          props.blurRegion = blurStrength !== undefined ? blurStrength : true;
        } else {
          props.blur = blurStrength !== undefined ? blurStrength : true;
        }

      } else if (name === 'pixelate') {
        // e_pixelate, e_pixelate_faces, e_pixelate_region all produce name:"pixelate".
        // Level qualifier is "square_size" (not "level"/"strength").
        var squareSize = getQualifier('square_size') || getQualifier('level');
        var pixRegion = getQualifier('region');
        if (pixRegion === 'faces') {
          props.pixelateFaces = squareSize !== undefined ? squareSize : true;
        } else if (pixRegion !== undefined) {
          props.pixelateRegion = squareSize !== undefined ? squareSize : true;
        } else {
          props.pixelate = squareSize !== undefined ? squareSize : true;
        }

      } else if (name === 'distort') {
        // e_distort:40:25:280:60:260:155:35:165 → actionsDTO:
        //   {group:"reshape", name:"distort", qualifiers:[{name:"distort_values", value:[40,25,...]}]}
        // url-loader distort prop accepts a colon-separated coordinate string.
        var distortValQual = qualifiers.find(function(q) { return q.name === 'distort_values'; });
        if (distortValQual && Array.isArray(distortValQual.value)) {
          props.distort = distortValQual.value.join(':');
        }

      } else if (name === 'distort_arc') {
        // e_distort:arc:80 → actionsDTO: {group:"reshape", name:"distort_arc",
        //   qualifiers:[{name:"degree", value:80}]}
        // url-loader distort prop accepts "arc:80".
        var arcDegree = getQualifier('degree');
        if (arcDegree !== undefined) {
          props.distort = 'arc:' + arcDegree;
        }

      } else if (name === 'shear') {
        // e_shear:20 → actionsDTO: {group:"reshape", name:"shear",
        //   qualifiers:[{name:"skew_x", value:20}]}
        // e_shear:20:0 → qualifiers:[{name:"skew_x",...},{name:"skew_y",...}]
        // url-loader shear prop accepts the value string "skewX" or "skewX:skewY".
        var skewX = getQualifier('skew_x');
        var skewY = getQualifier('skew_y');
        if (skewX !== undefined) {
          props.shear = skewY !== undefined ? String(skewX) + ':' + String(skewY) : String(skewX);
        }

      } else if (name === 'replace_color') {
        // e_replace_color:red → actionsDTO: {group:"adjust", name:"replace_color",
        //   qualifiers:[{group:"color", name:"red"}]}
        // url-loader replaceColor prop accepts a string (the part after e_replace_color:).
        var toColorQual = qualifiers.find(function(q) { return q.group === 'color'; });
        var toColor = extractColorString(toColorQual);
        if (toColor) props.replaceColor = toColor;

      } else if (name === 'edit' && group === 'animated') {
        // e_loop / e_loop:5 → actionsDTO: {group:"animated", name:"edit",
        //   qualifiers:[{name:"loop", value:true|5}]}
        var loopQ = qualifiers.find(function(q) { return q.name === 'loop'; });
        if (loopQ) {
          var loopVal = resolveQualifierValue(loopQ);
          props.loop = (loopVal !== undefined && loopVal !== true) ? loopVal : true;
        }

      } else {
        // 'blend' used by fill_light and improve; 'line_strength' used by cartoonify.
        var level = getQualifier('level') || getQualifier('strength') || getQualifier('blend') || getQualifier('line_strength');
        var propName = EFFECT_PROP_MAP[name];
        if (propName) {
          props[propName] = level !== undefined ? level : true;
        } else {
          var urlName = EFFECT_URL_NAME_OVERRIDE[name] || name;
          rawTransformations.push(level !== undefined ? 'e_' + urlName + ':' + level : 'e_' + urlName);
        }
      }

    } else if (group === 'delivery') {
      if (name === 'quality') {
        var qLevel = getQualifier('level') || getQualifier('quality');
        props.quality = qLevel !== undefined ? qLevel : 'auto';
      }

    } else if (group === 'round_corners') {
      // r_20 → actionsDTO: {group:"round_corners", name:"by_radius",
      //   qualifiers:[{name:"radius", value:20}]}
      // r_max → actionsDTO: {group:"round_corners", name:"max"}
      if (name === 'by_radius') {
        var radiusVal = getQualifier('radius');
        if (radiusVal !== undefined) props.radius = radiusVal;
      } else if (name) {
        props.radius = name; // e.g. "max"
      }

    } else if (name === 'background_color') {
      // background_color has no group in actionsDTO.
      // b_red     → qualifiers:[{group:"color", name:"red"}]
      // b_rgb:9090ff → qualifiers:[{group:"color", name:"rgb", qualifiers:[{name:"color",value:"#9090ff"}]}]
      var bgColor = extractColorString(qualifiers[0]);
      if (bgColor) props.background = bgColor;

    } else if (group === 'rotate') {
      // angle uses a_ URL prefix (not e_), so must be handled here, not via rawTransformations.
      // actionsDTO qualifier name is 'angle' matching the human-readable parameter name.
      var angleVal = getQualifier('angle');
      if (angleVal !== undefined) props.angle = angleVal;

    } else if (group === 'border') {
      // Ruby CGS: { group:"border", name:"solid", qualifiers:[{name:"width",value:5},{name:"color",...}] }
      // CldImage border prop accepts a string like "5px_solid_black" (same as URL sans bo_ prefix).
      var borderWidth = getQualifier('width');
      var borderColor = getQualifier('color');
      var parts = [];
      if (borderWidth !== undefined) parts.push(borderWidth + 'px');
      if (name) parts.push(name); // style: "solid"
      if (borderColor !== undefined) parts.push(borderColor);
      if (parts.length > 0) props.border = parts.join('_');

    } else if (name === 'add_flag') {
      // add_flag is NOT unwrapped by convertAction (special case alongside background_color).
      // Named flag: { name:"add_flag", qualifiers:[{group:"flag", name:"progressive"}] }
      // Raw flag:   { name:"add_flag", qualifiers:[{name:"flag", value:"unhandled"}] }
      //   → for raw flags the qualifier name is "flag" and the value holds the actual flag string.
      var flagQual = qualifiers[0];
      if (flagQual) {
        var flagName = (flagQual.name === 'flag' && flagQual.value !== undefined)
          ? flagQual.value
          : flagQual.name;
        if (flagName) {
          if (!props.flags) props.flags = [];
          props.flags.push(flagName);
        }
      }

    } else if (group === 'named_transformation') {
      // t_my_preset → actionsDTO: {group:"named_transformation", name:"name",
      //   qualifiers:[{name:"named_transformation", value:"my_preset"}]}
      // The preset name is in the qualifier whose name is "named_transformation".
      var transformName = getQualifier('named_transformation');
      if (transformName) {
        if (!props.namedTransformations) props.namedTransformations = [];
        props.namedTransformations.push(transformName);
      }

    } else if (group === 'background') {
      // b_auto → {group:"background", name:"auto"}
      // b_blurred:400:15 → {group:"background", name:"blurred",
      //   qualifiers:[{name:"intensity",value:400},{name:"brightness",value:15}]}
      // b_gen_fill:prompt_mug → {group:"background", name:"generative_fill",
      //   qualifiers:[{name:"prompt",value:"mug"}]}
      if (name === 'generative_fill') {
        if (!props.fillBackground) {
          var genFillPrompt = getQualifier('prompt');
          props.fillBackground = genFillPrompt ? { prompt: genFillPrompt } : true;
        }
      } else {
        // actionsDTO strips the "auto:" prefix from predominant/border variants:
        //   b_auto:predominant → name "predominant", b_auto:border → name "border".
        // BACKGROUND_URL_NAME restores the correct URL form.
        var bgUrlName = BACKGROUND_URL_NAME[name] || name;
        var bgStr = bgUrlName;
        var bgParams = qualifiers.map(function(q) {
          return resolveQualifierValue(q);
        }).filter(function(v) { return v !== undefined && v !== null; });
        if (bgParams.length > 0) bgStr += ':' + bgParams.join(':');
        props.background = bgStr;
      }
    }
  });

  if (rawTransformations.length > 0) props.rawTransformations = rawTransformations;
  return props;
}

// ─── Overlay/underlay fallback (mediaConfig.transformation) ──────────────────
//
// Overlay/underlay actions arrive in actionsDTO as a single grouped action
// ({ group: "overlay" }) with all source/position data nested inside.
// We can't reconstruct the full prop form without a stateful multi-action
// system, so we fall back to rawTransformations using the structured
// mediaConfig.transformation array (which has the original step-by-step data).
//
// Step format: { overlay: "public_id" }, { crop_mode: "scale", width: "100" },
//              { flags: "layer_apply", gravity: "south_east" }
//
var TRANSFORMATION_KEY_TO_PREFIX = {
  crop_mode: 'c_', width: 'w_', height: 'h_', gravity: 'g_',
  aspect_ratio: 'ar_', zoom: 'z_', effect: 'e_', quality: 'q_',
  format: 'f_', flags: 'fl_', overlay: 'l_', underlay: 'u_',
  angle: 'a_', x: 'x_', y: 'y_', radius: 'r_', opacity: 'o_',
  border: 'bo_', background: 'b_', color: 'co_', dpr: 'dpr_', delay: 'dl_',
};

function serializeTransformationStep(step) {
  return Object.keys(step).map(function(key) {
    var prefix = TRANSFORMATION_KEY_TO_PREFIX[key];
    if (!prefix) return null;
    var value = step[key];
    if (value === null || value === undefined) return null;
    if (typeof value === 'object') value = Object.keys(value)[0] + ':' + Object.values(value)[0];
    return prefix + value;
  }).filter(Boolean).join(',');
}

function applyOverlayTransformations(transformation, props) {
  var steps = transformation || [];
  var i = 0;
  while (i < steps.length) {
    var step = steps[i];
    var isOverlay = step.overlay !== undefined;
    var isUnderlay = step.underlay !== undefined;

    if (isOverlay || isUnderlay) {
      var block = [];
      while (i < steps.length) {
        block.push(steps[i]);
        var isLayerApply = steps[i].flags &&
          steps[i].flags.toString().indexOf('layer_apply') !== -1;
        i++;
        if (isLayerApply) break;
      }
      var rawStr = block.map(serializeTransformationStep).filter(Boolean).join('/');
      if (rawStr) {
        if (!props.rawTransformations) props.rawTransformations = [];
        props.rawTransformations.push(rawStr);
      }
    } else {
      i++;
    }
  }
}

// ─── Generative AI fallback (mediaConfig.transformation) ─────────────────────
//
// Ruby CGS ≤0.1.84 returns actions:null for e_gen_* transformations, leaving
// actionsDTO empty. parsed_url.transformation always contains the raw data.
// This function reads that array and maps known gen_ effects to CldImage props.
//
// Transformation step format: { effect: "gen_fill" }
//                             { effect: "gen_remove:prompt_tree" }
//                             { effect: "gen_replace:from_cat;to_dog" }
//
function applyGenerativeEffects(transformation, props) {
  (transformation || []).forEach(function(step) {
    var effect = step.effect;
    if (!effect || typeof effect !== 'string') return;

    var colonIdx = effect.indexOf(':');
    var name = colonIdx === -1 ? effect : effect.slice(0, colonIdx);
    var paramStr = colonIdx === -1 ? '' : effect.slice(colonIdx + 1);

    // Parse semicolon-delimited key_value pairs (e.g. "prompt_tree;multiple_true")
    function parseParam(key) {
      var prefix = key + '_';
      var entry = paramStr.split(';').find(function(p) { return p.startsWith(prefix); });
      return entry ? entry.slice(prefix.length) : undefined;
    }

    if (name === 'gen_fill') {
      if (!props.fillBackground) { // don't overwrite if already set via actionsDTO
        var prompt = parseParam('prompt');
        props.fillBackground = prompt ? { prompt: prompt } : true;
      }
    } else if (name === 'gen_remove') {
      if (!props.remove) {
        var prompt = parseParam('prompt');
        if (prompt) props.remove = { prompt: prompt };
        else props.remove = true;
      }
    } else if (name === 'gen_replace') {
      if (!props.replace) {
        var from = parseParam('from');
        var to = parseParam('to');
        if (from && to) props.replace = [from, to];
      }
    } else if (name === 'gen_recolor') {
      if (!props.recolor) {
        var prompt = parseParam('prompt');
        var toColor = parseParam('to-color');
        if (prompt) props.recolor = toColor ? [prompt, toColor] : { prompt: prompt };
      }
    } else if (name === 'gen_background_replace') {
      if (!props.replaceBackground) {
        var prompt = parseParam('prompt');
        props.replaceBackground = prompt || true;
      }
    } else if (name === 'restore') {
      if (!props.restore) props.restore = true;
    } else if (name === 'enhance') {
      if (!props.enhance) props.enhance = true;
    }
  });
}

// ─── actionsDTO → CldVideoPlayer props ───────────────────────────────────────
//
// CldVideoPlayer differs from CldImage:
//   - width and height are direct props (player dimensions)
//   - crop/gravity go into a `transformation` object
//   - quality is a direct prop

function mapActionsDTOToVideoProps(actionsDTO) {
  var directProps = {};
  var transformation = {};

  (actionsDTO || []).forEach(function(action) {
    var group = (action.group || '').toLowerCase();
    var name = (action.name || '').toLowerCase();
    var qualifiers = action.qualifiers || [];
    var getQualifier = makeGetQualifier(qualifiers);

    if (group === 'resize') {
      var width = getQualifier('width');
      var height = getQualifier('height');
      var gravity = resolveGravityValue(qualifiers);

      if (width !== undefined) directProps.width = width;
      if (height !== undefined) directProps.height = height;
      if (name !== 'scale') transformation.crop = name;
      if (gravity !== undefined) transformation.gravity = gravity;

    } else if (group === 'delivery') {
      if (name === 'quality') {
        var qLevel = getQualifier('level') || getQualifier('quality');
        directProps.quality = qLevel !== undefined ? qLevel : 'auto';
      }
    }
  });

  if (Object.keys(transformation).length > 0) directProps.transformation = transformation;
  return directProps;
}

// ─── JSX builders ─────────────────────────────────────────────────────────────

function serializePropValue(value) {
  if (typeof value === 'string') return '"' + value + '"';
  if (typeof value === 'number' || typeof value === 'boolean') return '{' + value + '}';
  if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
    return '{' + JSON.stringify(value) + '}';
  }
  return '{' + String(value) + '}';
}

var IMAGE_ORDERED_PROPS = ['width', 'height', 'crop', 'gravity', 'aspectRatio', 'zoom', 'x', 'y'];
var VIDEO_ORDERED_PROPS = ['width', 'height', 'quality'];

function emitProps(lines, props, orderedKeys) {
  function emitProp(key, value) {
    lines.push(value === true ? '  ' + key : '  ' + key + '=' + serializePropValue(value));
  }
  orderedKeys.forEach(function(key) {
    if (props[key] !== undefined) emitProp(key, props[key]);
  });
  Object.keys(props).forEach(function(key) {
    if (orderedKeys.indexOf(key) !== -1 || key === 'rawTransformations') return;
    emitProp(key, props[key]);
  });
  if (props.rawTransformations !== undefined) {
    lines.push('  rawTransformations=' + serializePropValue(props.rawTransformations));
  }
}

function humanizePublicId(publicId) {
  var name = publicId.split('/').pop() || publicId;
  name = name.replace(/[-_]/g, ' ');
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function buildCldImageJSX(publicId, props) {
  var lines = ['<CldImage'];
  lines.push('  src="' + publicId + '"');
  emitProps(lines, props, IMAGE_ORDERED_PROPS);
  lines.push('  alt="' + humanizePublicId(publicId) + '"');
  lines.push('/>');
  return lines.join('\n');
}

function buildCldVideoPlayerJSX(publicId, props) {
  var lines = ['<CldVideoPlayer'];
  lines.push('  src="' + publicId + '"');
  emitProps(lines, props, VIDEO_ORDERED_PROPS);
  lines.push('/>');
  return lines.join('\n');
}

// ─── Entry point ──────────────────────────────────────────────────────────────

module.exports = {
  SDKSpecVersion: 'master',

  customGenerator: function(mediaConfig, includeImports) {
    var publicId = mediaConfig.public_id || '';
    var actionsDTO = mediaConfig.actionsDTO || [];
    var isVideo = (mediaConfig.resource_type || '').toLowerCase() === 'video';

    var jsx, importStatement;

    if (isVideo) {
      var videoProps = mapActionsDTOToVideoProps(actionsDTO);
      // CldVideoPlayer does not require width/height but they are strongly recommended
      if (videoProps.width === undefined) videoProps.width = 1920;
      if (videoProps.height === undefined) videoProps.height = 1080;
      jsx = buildCldVideoPlayerJSX(publicId, videoProps);
      importStatement = "import { CldVideoPlayer } from 'next-cloudinary';\n\n";
    } else {
      var imageProps = mapActionsDTOToImageProps(actionsDTO);
      // Apply generative effects from parsed_url.transformation as a fallback.
      // Ruby CGS ≤0.1.84 returns actions:null for e_gen_* so actionsDTO misses them.
      applyGenerativeEffects(mediaConfig.transformation, imageProps);
      // Overlay/underlay actions can't be reconstructed as named props — fall back
      // to rawTransformations using the structured transformation array.
      applyOverlayTransformations(mediaConfig.transformation, imageProps);
      // next/image requires width and height — add defaults when not set by the URL
      if (imageProps.width === undefined) imageProps.width = 960;
      if (imageProps.height === undefined) imageProps.height = 600;
      jsx = buildCldImageJSX(publicId, imageProps);
      importStatement = "import { CldImage } from 'next-cloudinary';\n\n";
    }

    return includeImports ? importStatement + jsx : jsx;
  },
};
