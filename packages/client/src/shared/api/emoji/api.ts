import { LOCAL_BASE } from 'constant'
import { HTTPTransport } from 'transport'

class EmojiApi {
  private http = new HTTPTransport(LOCAL_BASE)

  public getEmoji() {
    return this.http.get('emoji')
  }
}

export const emojiApi = new EmojiApi()
