$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "awe-monitor/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "awe-monitor"
  s.version     = AweMonitor::VERSION
  s.authors     = ["TODO: Your name"]
  s.email       = ["TODO: Your email"]
  s.homepage    = "TODO"
  s.summary     = "TODO: Summary of AweMonitor."
  s.description = "TODO: Description of AweMonitor."

  s.files = Dir["{app,config,db,lib}/**/*"] + ["MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency "rails", "~> 3.1.1"

  s.add_development_dependency "activerecord-jdbcsqlite3-adapter"
end
