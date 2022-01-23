import React, { useEffect } from 'react'
import { Spine } from 'pixi-spine'

import * as PIXI from 'pixi.js'
import { Ticker } from 'pixi.js'

type Props = {
  className?: string
  id?: string
  width: number
  height: number
}

/**
 * 
 */
const SpineObject: React.FC<Props> = ({ className, id, width, height }) => {
  useEffect(() => {
    const app = new PIXI.Application({
      "width": width * 1,
      "height": height * 2,
      "backgroundAlpha": 0,
      "antialias": false
    })


    app.stage.interactive = true;
    document.getElementById(`SpineModel${id}`).appendChild(app.view)

    app.loader
      .add("spineCharactor", "/images/Spine/sd_player.json")
      .load((loader, resources) => {
        let anim = new Spine(resources.spineCharactor.spineData)

        anim.x = app.screen.width / 2
        anim.y = app.screen.height

        anim.buttonMode = true
        anim.cursor = "pointer"

        anim.scale.set(1)
        anim.scale.x *= -1
        anim.state.timeScale = 0
        anim.state.setAnimation(0, "Idle2", true)

        // アニメーションの遷移時間設定
        const duration = 0.05
        anim.stateData.setMix("Idle", "Jump", duration)
        anim.stateData.setMix("Idle2", "Jump", duration)
        anim.stateData.setMix("Jump", "Idle", duration)
        anim.stateData.setMix("Jump", "Idle2", duration)

        // Pixi描写キャンバスのアペンド
        app.stage.addChild(anim)

        // キャラクターにポイントオーバーしてから初めて動く
        app.stage.once("pointerover", () => {
          anim.state.timeScale = 1
          anim.state.setAnimation(0, "Idle2", true)
        })
        let jumping = false

        // キャラクタータッチ後にジャンプする
        app.stage.on("pointerdown", () => {
          anim.state.timeScale = 1
          if (jumping) return
          jumping = true

          anim.state.setAnimation(0, "Jump", true)

          let time = 0;
          const gravity = 0.8
          const power = 15
          let jumpAt = anim.y

          const tick = deltaMs => {
            const jumpHeight = (-gravity / 2) * Math.pow(time, 2) + power * time;

            if (jumpHeight < 0) {
              jumping = false;
              Ticker.shared.remove(tick);
              anim.y = jumpAt;
              if (Math.random() > 0.1) {
                anim.state.setAnimation(0, "Idle2", true)
              }
              else {
                anim.state.setAnimation(0, "Idle", true)
              }
              return;
            }
            anim.y = jumpAt + (jumpHeight * -1);
            time += deltaMs;
          }
          Ticker.shared.add(tick);
        })
      })
    return () => {
      app?.destroy(true)
    }
  }, []);


  return (
    <div id={`SpineModel${id}`} className={className}>

    </div>
  )
}

export default SpineObject