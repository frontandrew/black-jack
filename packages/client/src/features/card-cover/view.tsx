import { Button, ButtonGroup, Grid } from '@mui/material'
import { skinCards, skinTable } from 'features/game/model'
import {
  backBlack,
  backBlue,
  backRed,
  skinTableBlue,
  skinTableGreen,
  twoClubs,
  twoClubsWhite,
} from 'images'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'shared/store/store'

const checkImg = (name: string) => {
  if (name === 'brown') {
    return twoClubs
  }
  if (name === 'white') {
    return twoClubsWhite
  }
  if (name === 'red') {
    return backRed
  }
  if (name === 'black') {
    return backBlack
  } else {
    return backBlue
  }
}

export const CardCover: React.FC = () => {
  const dispatch = useDispatch()
  const game = useSelector((state: RootState) => state.game)
  const [cardCover, setCardCover] = useState(game.cardCover)
  const [tableSkin, setTableSkin] = useState(game.tableSkin)

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const skin = event.currentTarget.name

    if (skin === 'brown') {
      setCardCover({
        front: skin,
        back: '',
      })
    }

    if (skin === 'white') {
      setCardCover({
        front: skin,
        back: cardCover.back,
      })
    }

    if (skin === 'red') {
      setCardCover({
        front: cardCover.front,
        back: skin,
      })
    }

    if (skin === 'black') {
      setCardCover({
        front: cardCover.front,
        back: skin,
      })
    }

    if (skin === 'blue') {
      setCardCover({
        front: cardCover.front,
        back: skin,
      })
    }

    if (skin === 'tableGreen') {
      setTableSkin('green')
    }

    if (skin === 'tableBlue') {
      setTableSkin('blue')
    }
  }

  useEffect(() => {
    dispatch(skinCards(cardCover))
  }, [cardCover])

  useEffect(() => {
    dispatch(skinTable(tableSkin))
  }, [tableSkin])

  return (
    <Grid container direction="column" alignItems="center" gap={4}>
      <Grid>
        <ButtonGroup variant="outlined" aria-label="Basic button group">
          {['brown', 'white', 'red', 'black', 'blue'].map(name => (
            <Button key={name} name={name} onClick={handleClick}>
              <img src={checkImg(name)} />
            </Button>
          ))}
        </ButtonGroup>
      </Grid>
      <Grid>
        <ButtonGroup variant="outlined" aria-label="Basic button group">
          {['tableGreen', 'tableBlue'].map(name => (
            <Button key={name} name={name} onClick={handleClick}>
              <img
                src={name === 'tableGreen' ? skinTableGreen : skinTableBlue}
              />
            </Button>
          ))}
        </ButtonGroup>
      </Grid>
    </Grid>
  )
}
