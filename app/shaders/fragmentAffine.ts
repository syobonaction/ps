const fragmentAffine = /* glsl */
  `
    uniform sampler2D uTexture;
    uniform vec2 repeat;
    varying vec2 vUv;

    void main()
    {
      vec2 uv = vUv;

      uv = fract(uv * repeat);
  	  vec2 smooth_uv = repeat * vUv;

      vec4 duv = vec4(dFdx(smooth_uv), dFdy(smooth_uv));
  	  vec3 txl = textureGrad(uTexture, uv, duv.xy, duv.zw).rgb;

 		  gl_FragColor = vec4(txl, 1.0);
    }
  `

export default fragmentAffine