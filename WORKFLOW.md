
1. Write in Obsidian (Opening local Documents/GitHub/aria folder "as vault")
2. GitHub Desktop → Repository → Open in Terminal
3. In Terminal run: python3 -m mkdocs serve
4. Open site in local server (address is in Terminal - leave Terminal running)
5. Preview these edits by refreshing local server (updated since last save)
6. When edits are made, commit in Github Desktop
7. View libretto site at katarinarankovic.github.io/aria

**Tip: If your local site doesn’t update immediately**
Sometimes MkDocs doesn’t auto-reload the browser tab. Two easy fixes:
- just refresh the browser tab manually, or
- restart the server (Ctrl+C in Terminal, then run `python3 -m mkdocs serve` again)

## libretto key

*Italics* = stage directions

CAPITALS = character

>block quote = lyrics

<!-- audio --> = invisible bandcamp embedding (visible on the site)

Use:
```
<br>
``` 
inside lyric blocks to force line breaks.


## media embeddings

**Vertical video embed template**

```
<div style="max-width: 240px; margin: 0;">
  <div style="position: relative; width: 100%; padding-top: 177.78%;">
    <iframe
      src="https://www.youtube.com/embed/VIDEO_ID?modestbranding=1&rel=0&playsinline=1"
      title="Song sketch"
      style="position: absolute; inset: 0; width: 100%; height: 100%;"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen>
    </iframe>
  </div>
</div>
```


**Horizontal video embed template**

```
<div style="max-width: 720px; margin: 0;">
  <div style="position: relative; width: 100%; padding-top: 56.25%;">
    <iframe
      src="https://www.youtube.com/embed/VIDEO_ID?modestbranding=1&rel=0&playsinline=1"
      title="Song sketch"
      style="position: absolute; inset: 0; width: 100%; height: 100%;"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen>
    </iframe>
  </div>
</div>
```


**16:10 (macbook screen recording) video embed template**

```
<div style="max-width: 240px; margin: 0;">
  <div style="position: relative; width: 100%; padding-top: 62.5%;">
    <iframe
      src="https://www.youtube.com/embed/VIDEO_ID?modestbranding=1&rel=0&playsinline=1"
      title="Song sketch"
      style="position: absolute; inset: 0; width: 100%; height: 100%;"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen>
    </iframe>
  </div>
</div>
```
