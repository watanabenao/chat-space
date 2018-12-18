require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ChatSpace
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
        config.generators do |g|
      g.stylesheets false
      g.javascripts false
      g.helper false
      g.test_framework false
    end
    
    config.i18n.default_locale = :ja
    config.time_zone = 'Tokyo'

  #  ActiveRecord 使用時に DB に書かれる時刻も合わせたい場合は以下も追加
    config.active_record.default_timezone = :local
    Time::DATE_FORMATS[:default] = '%Y/%m/%d %H:%M'
  end
end

