import { Popover, Typography } from '@material-ui/core'
import Image from 'next/image'
import { useState } from 'react'
import { formatCurrency } from '../../utils';

function getPriceText (nft) {
  console.log(JSON.stringify(nft))
  const { sold, canceled } = nft
  if (sold) {
    return 'Sold for'
  }

  if (canceled) {
    return 'Offered for'
  }

  return 'Price'
}

export default function NFTPrice ({ nft }) {
  const priceText = getPriceText(nft)
  const [anchorEl, setAnchorEl] = useState(null)

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  return (
    <div style={{ textAlign: 'center' }}>

      <Typography
      variant="h4"
      color="text.secondary"
      >
        {priceText}
      </Typography>
      <Typography
      gutterBottom
      variant="h4"
      color="text.secondary"
      >
        <span style={{ display: 'inline-block', transform: 'translateY(3px)' }}>
          <Image
            alt='Bilidly'
            src='/Bilidly-O_512x512px.png'
            width="20px"
            height="20px"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          />
        </span>
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: 'none'
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography sx={{ p: 1 }}>BI</Typography>
        </Popover>
        {' '}{formatCurrency(nft.price)}
      </Typography>
    </div>
  )
}