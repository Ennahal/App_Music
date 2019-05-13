import { Component, OnInit } from '@angular/core';
import {AlbumService} from "../album.service";
import {interval} from "rxjs";

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {
  current: number = 1;
  total: number;
  ratio: number = 0;

  constructor(private aS: AlbumService) { }

  ngOnInit() {
    this.aS.subjectAlbum.subscribe(album => {
      const total = Math.floor(album.duration /120);
      let current = 1;

     this.total = total;

      const interval = setInterval(() =>{
        if (current < total) {
          current++;
          this.current = current;
          this.ratio = Math.floor(current * (100/total));
        } else {
          this.total = null;
          this.ratio = 0;
          this.current = 1;
          this.aS.switchOff(album);
          clearInterval(interval);
        }
      }, 1000)
    });
  }

}
