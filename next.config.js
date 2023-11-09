/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["ik.imagekit.io"],
  },
};

const removeImports = require('next-remove-imports')();
module.exports = removeImports({});

module.exports = nextConfig;
