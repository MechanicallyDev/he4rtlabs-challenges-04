import PalletSong from './PalletSong';
import TitleScreenSong from './TitleScreenSong';
import BattleSong from './BattleSong';
import OakTheme from './OakTheme';
import Bicycle from './Bicycle';
import Celadon from './Celadon';
import Cerulean from './Cerulean';
import Cinnabar from './Cinnabar';
import GameCorner from './GameCorner';

function Songlist(songName) {
  let song;
  switch (songName) {
    case 'pallet': song = PalletSong; break;
    case 'titlescreen': song = TitleScreenSong; break;
    case 'battle': song = BattleSong; break;
    case 'oaktheme': song = OakTheme; break;
    case 'bicycle': song = Bicycle; break;
    case 'celadon': song = Celadon; break;
    case 'cerulean': song = Cerulean; break;
    case 'cinnabar': song = Cinnabar; break;
    case 'gamecorner': song = GameCorner; break;

    default: song = null; break;
  }
  
  return song
}

export default Songlist;