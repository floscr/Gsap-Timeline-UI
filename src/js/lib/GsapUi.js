import template from '../templates/ui.jade';
import styles from '../../scss/gsapui.scss';

export default class GsapUi {
  constructor(timelines) {

    this.timelines = [];

    // Accept single and multiple timeline objects
    if (timelines instanceof Array) {
      this.timelines.push(...timelines);
    } else {
      this.timelines.push(timelines);
    }

    // Set the first timeline as the active timeline
    this.activeTimeline = this.timelines[0];
  }
};
