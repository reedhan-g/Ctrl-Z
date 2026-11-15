import {useGame} from './game.ts';
import {useNavigation} from './navigation.ts';
import {findScenery} from './sceneryInfo.ts';

// Informational scenery belongs to presentation state, never the save journal.
export function inspectScenery(id:string|null){
 if(id&&!findScenery(id))return false;
 useGame.getState().select(null);
 useNavigation.setState({sceneryId:id});return true;
}
