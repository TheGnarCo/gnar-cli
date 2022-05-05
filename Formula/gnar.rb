# Documentation: https://docs.brew.sh/Formula-Cookbook
#                https://rubydoc.brew.sh/Formula
class Gnar < Formula
  desc 'Decorate your Apps with Gnarly opinions'
  homepage 'https://github.com/TheGnarCo/gnar-cli'
  url $URL
  sha256 $SHA
  license 'MIT'
  version $VERSION

  def install
    bin.install 'gnar'
  end
end
