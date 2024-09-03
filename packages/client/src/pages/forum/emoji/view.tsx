import React, { useState, FC } from 'react'
import { Box, Typography, IconButton, Grid, Popover } from '@mui/material'
import AddReactionIcon from '@mui/icons-material/AddReaction'
import { EMOJIS_PACK } from 'constant'

export const EmojiChoice: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const idEmoji = open ? 'simple-popper' : undefined
  const [emojis, setEmoji] = useState<string[]>([])

  const handleDestroyEmoji = (index: number) => {
    const emojiArr = emojis
    const emojiToDelete = emojiArr[index]
    const filteredEmojis = emojiArr.filter(emoji => emoji !== emojiToDelete)
    setEmoji(filteredEmojis)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number | undefined
  ) => {
    if (index === undefined) {
      return setAnchorEl(anchorEl ? null : event.currentTarget)
    }
    const emoji = EMOJIS_PACK[index]
    const emojiArr = emojis
    if (!emojiArr.includes(emoji)) {
      emojiArr.push(emoji)
      setEmoji(emojiArr)
    }
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  return (
    <Grid display={'flex'} gap={2} margin={2}>
      <IconButton
        aria-describedby={idEmoji}
        aria-label="addreactionicon"
        onClick={event => handleClick(event, undefined)}>
        <AddReactionIcon />
      </IconButton>
      <Popover
        id={idEmoji}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}>
        <Box
          sx={{
            p: 1,
            bgcolor: 'background.paper',
          }}>
          {EMOJIS_PACK.map((emoji, index) => {
            return (
              <IconButton
                key={index}
                data-id={index}
                aria-describedby={idEmoji}
                aria-label="addreactionicon"
                onClick={event => handleClick(event, index)}>
                {emoji}
              </IconButton>
            )
          })}
        </Box>
      </Popover>
      {emojis.length !== 0 ? (
        emojis.map((emoji, index) => {
          return (
            <Box
              key={index}
              display={'flex'}
              alignItems={'center'}
              sx={{
                height: '40px',
                width: '70px',
                borderRadius: 20,
                bgcolor: 'primary.main',
              }}>
              <IconButton
                aria-describedby={idEmoji}
                aria-label="addreactionicon"
                onClick={() => handleDestroyEmoji(index)}>
                {emoji}
              </IconButton>
              <Typography gutterBottom variant="h6" component="div">
                1
              </Typography>
            </Box>
          )
        })
      ) : (
        <Box maxWidth={70} display={'flex'} alignItems={'center'}></Box>
      )}
    </Grid>
  )
}
