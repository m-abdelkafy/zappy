import { Component, OnInit } from '@angular/core';

import { Tweets, Tweet } from './Tweets';
import { ZappyService } from './zappy.service';

@Component({
    selector: 'app-zappy',
    templateUrl: './zappy.component.html',
    providers: [ZappyService],
    styleUrls: ['./zappy.component.scss']
})

export class ZappyComponent implements OnInit {
    tweets: Tweet[];
    constructor(private zappyService: ZappyService) { }
    ngOnInit() {
        this.getTweets();
        console.log(this.tweets);
    }
    getTweets(): void {
        this.zappyService.getTweets()
            .subscribe(tweets => this.tweets = tweets.tweets);
    }

}
