import { Component } from '@angular/core';
import { Config, ConfigService } from './config.service';

@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    providers: [ConfigService],
    styles: ['.error {color: red;}']
})
export class ConfigComponent {
    config: any;
    headers: string[];
    constructor(private configService: ConfigService) { }

    showConfig() {
        this.configService.getConfig()
            .subscribe((data: Config) => this.config = { ...data });
    }

    showConfigResponse() {
        this.configService.getConfigResponse()
            // resp is of type `HttpResponse<Config>`
            .subscribe(resp => {
                // display its headers
                const keys = resp.headers.keys();
                this.headers = keys.map(key =>
                    `${key}: ${resp.headers.get(key)}`);
                // access the body directly, which is typed as `Config`.
                this.config = { ...resp.body };
            });
    }
}
