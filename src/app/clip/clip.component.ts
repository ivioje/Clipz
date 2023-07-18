import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ClipComponent implements OnInit {
  id = ''
  @ViewChild('videoPlayer', { static: true }) target?: ElementRef
  player?: Player

  constructor(
    public route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.player = videojs(this.target?.nativeElement)

    this.route.params.subscribe((params: Params) => {
      this.id = params.id
    })
  }
}
