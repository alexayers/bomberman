import {WebStorage} from "../filesystem/webStorage";
var configuration = require("../../../resources/cfg/engine.json");


export class ConfigurationManager {
    private static _configuration:any;

    public static init() {
        ConfigurationManager._configuration =  configuration;
        ConfigurationManager.saveConfiguration();
        console.info("Configuration initialized");
    }

    private static saveConfiguration() {

        if (ConfigurationManager.doesConfiguratinoExist()) {
            console.log("Configuration already exists");
        }

        WebStorage.saveObject("configuration", ConfigurationManager._configuration);
    }

    public static getValue(key: string) : any {
        return ConfigurationManager._configuration[key];
    }

    private static doesConfiguratinoExist() {
        return WebStorage.doesKeyExist("configuration");
    }

}