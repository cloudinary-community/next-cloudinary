module.exports = api => {
  const presets = []

  if ( api.env('test') ) {
    presets.push([['@babel/preset-env', {targets: {node: 'current'}}]]);
  }

  presets.push(['@babel/preset-react', { runtime: 'automatic' }]);
  presets.push(['@babel/preset-typescript']);

  return {
    presets
  };
};
