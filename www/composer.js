{
    "name": "composer/composer",
    "type": "library",
    "description": "Composer helps you declare, manage and install dependencies of PHP projects. It ensures you have the right stack everywhere.",
    "keywords": [
        "package",
        "dependency",
        "autoload"
    ],
    "homepage": "https://getcomposer.org/",
    "license": "MIT",
    "authors": [
        {
            "name": "Nils Adermann",
            "email": "naderman@naderman.de",
            "homepage": "https://www.naderman.de"
        },
        {
            "name": "Jordi Boggiano",
            "email": "j.boggiano@seld.be",
            "homepage": "https://seld.be"
        }
    ],
    "require": {
        "php": "^7.2.5 || ^8.0",
        "composer/ca-bundle": "^1.0",
        "composer/class-map-generator": "^1.0",
        "composer/metadata-minifier": "^1.0",
        "composer/semver": "^3.2.5",
        "composer/spdx-licenses": "^1.5.7",
        "composer/xdebug-handler": "^2.0.2 || ^3.0.3",
        "justinrainbow/json-schema": "^5.2.11",
        "psr/log": "^1.0 || ^2.0 || ^3.0",
        "seld/jsonlint": "^1.4",
        "seld/phar-utils": "^1.2",
        "symfony/console": "^5.4.11 || ^6.0.11 || ^7",
        "symfony/filesystem": "^5.4 || ^6.0 || ^7",
        "symfony/finder": "^5.4 || ^6.0 || ^7",
        "symfony/process": "^5.4 || ^6.0 || ^7",
        "react/promise": "^2.8 || ^3",
        "composer/pcre": "^2.1 || ^3.1",
        "symfony/polyfill-php73": "^1.24",
        "symfony/polyfill-php80": "^1.24",
        "symfony/polyfill-php81": "^1.24",
        "seld/signal-handler": "^2.0"
    },
    "require-dev": {
        "symfony/phpunit-bridge": "^6.4.1 || ^7.0.1",
        "phpstan/phpstan": "^1.9.3",
        "phpstan/phpstan-phpunit": "^1.0",
        "phpstan/phpstan-deprecation-rules": "^1",
        "phpstan/phpstan-strict-rules": "^1",
        "phpstan/phpstan-symfony": "^1.2.10"
    },
    "suggest": {
        "ext-openssl": "Enabling the openssl extension allows you to access https URLs for repositories and packages",
        "ext-zip": "Enabling the zip extension allows you to unzip archives",
        "ext-zlib": "Allow gzip compression of HTTP requests"
    },
    "config": {
        "platform": {
            "php": "7.2.5"
        },
        "platform-check": false
    },
    "extra": {
        "branch-alias": {
            "dev-main": "2.7-dev"
        },
        "phpstan": {
            "includes": [
                "phpstan/rules.neon"
            ]
        }
    },
    "autoload": {
        "psr-4": {
            "Composer\\": "src/Composer/"
        }
    },
    "autoload-dev": {
        "psr-4": {
            "Composer\\Test\\": "tests/Composer/Test/"
        }
    },
    "bin": [
        "bin/composer"
    ],
    "scripts": {
        "compile": "@php -dphar.readonly=0 bin/compile",
        "test": "@php simple-phpunit",
        "phpstan": "@php vendor/bin/phpstan analyse --configuration=phpstan/config.neon"
    },
    "scripts-descriptions": {
        "compile": "Compile composer.phar",
        "test": "Run all tests",
        "phpstan": "Runs PHPStan"
    },
    "support": {
        "issues": "https://github.com/composer/composer/issues",
        "irc": "ircs://irc.libera.chat:6697/composer",
        "security": "https://github.com/composer/composer/security/policy"
    }
}