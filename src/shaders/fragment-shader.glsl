// fragment shaders don't have a default precision so we need
// to pick one. mediump is a good default
precision mediump float;

varying vec4 v_color;

void main() {
  // gl_FragColor is a special variable a fragment shader
  // is responsible for setting the color.
  gl_FragColor = v_color;
}