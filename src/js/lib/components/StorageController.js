import store from 'store';

class StorageController {

  constructor() {
    this.key = 'gsap';
    this.props = {
      isPlaying: 'isPlaying',
      progress: 'progress',
    }
  }

  set(key, value) {
    return store.set(`${this.storageKey}-${key}`, value);
  }
  get(key) {
    return store.get(`${this.storageKey}-${key}`);
  }

  set progress(value) {
    return this.set(this.props.progress, value);
  }
  get progress() {
    return this.get(this.props.progress);
  }

  set isPlaying(value) {
    return this.set(this.props.isPlaying, value);
  }
  get isPlaying() {
    return this.get(this.props.isPlaying);
  }

}

export default StorageController;
