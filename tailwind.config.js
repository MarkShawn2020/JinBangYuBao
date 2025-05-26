/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "text-main": "var(--text-main)",
        "x-9ea-1b-2": "var(--x-9ea-1b-2)",
      },
    },
  },
  plugins: [],
  corePlugins: {
    // 小程序不需要 preflight，因为这主要是给 h5 的，如果你要同时开发多端，你应该使用 process.env.TARO_ENV 环境变量来控制它
    preflight: false,
    // 禁用包含特殊字符的功能，避免微信小程序WXSS编译错误
    backdropBlur: false,
    backdropBrightness: false,
    backdropContrast: false,
    backdropGrayscale: false,
    backdropHueRotate: false,
    backdropInvert: false,
    backdropOpacity: false,
    backdropSaturate: false,
    backdropSepia: false,
    backdropFilter: false,
  },
  // 添加safelist确保基础类名被保留
  safelist: [
    'relative',
    'absolute',
    'fixed',
    'static',
    'sticky',
  ],
  // 禁用包含特殊字符的修饰符
  separator: '_',
};
