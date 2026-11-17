// Pixi's official CSP-compatible shader synchronizers avoid dynamic evaluation.
import 'pixi.js/unsafe-eval';
import {Assets} from 'pixi.js';

// The host permits image data URLs but neither blob workers nor fetching data
// URLs. Use Pixi's normal HTML image decoder for the same original atlas files.
Assets.setPreferences({preferWorkers: false,preferCreateImageBitmap: false});
