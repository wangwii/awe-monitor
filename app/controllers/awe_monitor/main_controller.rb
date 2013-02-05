module AweMonitor
  class MainController < ApplicationController
    def index
      script = File.expand_path('monitor.js', File.dirname(__FILE__))
      @jscontent = File.read(script)
    end
  end
end

