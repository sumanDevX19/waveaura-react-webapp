import React from 'react'

const EmbadedVideoSection = () => {
  return (
    <>
    <section className="embaded-video-section">
      <h2 className="video-heading">Exclusive Limited Edition</h2>
      <div className="video-section">
        <iframe
          className="frames"
          src="https://www.youtube.com/embed/WKdotkKJQYQ?si=FWkCxc-ji3oe0IFR"
          title="YouTube video player"
          frameBorder="0"

          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"></iframe>

        <iframe
          className="frames"
          src="https://www.youtube.com/embed/Cw6NXfP9BDg?si=xrJxxtvxJ8mdBjBN"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"></iframe>
        <iframe
          className="frames"
          src="https://www.youtube.com/embed/qPx4_GuHI4w?si=HTqEYwc4dFWp1lMd"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"></iframe>
      </div>
    </section>
    </>
  )
}

export default EmbadedVideoSection