import React from 'react'

type CompareDatesProps = {
  createdAt: Date
}

const CompareDates: React.FC<CompareDatesProps> = ({ createdAt }) => {
  function compareDates(inputDate: Date): boolean {
    const currentDate = new Date()

    if (inputDate < currentDate) {
      return true
    } else {
      return false
    }
  }
  return <div> {compareDates(createdAt)}</div>
}
export default CompareDates
