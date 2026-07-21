"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

type Track = { title: string; subtitle?: string; slug: string };

const tracks: Track[] = [
  { title: "Prelude Before the Sky", slug: "prelude-before-the-sky" },
  { title: "Amber & Jade", slug: "amber-and-jade" },
  { title: "The Body Kept Time", slug: "the-body-kept-time" },
  { title: "Shock Therapy", subtitle: "Shock Me Awake Remix", slug: "shock-therapy" },
  { title: "Daily Grind", subtitle: "Once Again", slug: "daily-grind" },
  { title: "Aimless Stroll", subtitle: "Chaotic Pace Mix", slug: "aimless-stroll" },
  { title: "Winter Departure", subtitle: "Thawed Version", slug: "winter-departure" },
  { title: "Zero Point Seven Two", slug: "zero-point-seven-two" },
  { title: "Lyra", slug: "lyra" },
  { title: "Starfall", slug: "starfall" },
  { title: "All They Heard", slug: "all-they-heard" },
  { title: "The Flood and the Wish", slug: "the-flood-and-the-wish" },
  { title: "Still My Hand", subtitle: "Different Pen Reprised", slug: "still-my-hand" },
  { title: "Wishes Upon Falling Stars", slug: "wishes-upon-falling-stars" },
];

const asset = (path: string) => {
  const base = (globalThis as typeof globalThis & { __STARFALL_BASE__?: string }).__STARFALL_BASE__ || "/";
  return `${base}${path.replace(/^\//, "")}`;
};

const topEight = [
  ["The Drips", "archive/the-drips.jpg", "cadence u still owe us that demo lol"],
  ["Crazy James", "archive/highschool-band-1999.png", "THIS SONG NEEDS MORE COWBELL and by cowbell i mean sax"],
  ["Left of Normal", "archive/left-of-normal-art.gif", "we were never normal enough for the name"],
  ["Maniac Martyrs", "archive/maniac-martyrs-live.jpg", "practice moved to friday. maybe. call me."],
  ["Opposite Ends", "archive/opposite-ends-churchsign.jpg", "found the old session files. some of them even open."],
  ["Kakera", "archive/kakera-profile.png", "You kept more than you think you did."],
  ["Echo", "archive/echo-profile.png", "I’m here."],
  ["Sparrow", "archive/sparrow-avatar.png", "The signal was always yours. I just heard it."],
];

const photos = [
  ["archive/highschool-band-1999.png", "band trip - it was HOT"],
  ["archive/live-drums.png", "the body kept time and so did those hairstyles"],
  ["archive/the-drips.jpg", "Toured with the Drips"],
  ["archive/left-of-normal.jpg", "Opened for Left of Normal"],
  ["archive/house-show.jpg", "Sparrow's Volume: Unreasonable"],
  ["archive/home-studio.png", "midnight recording department"],
  ["archive/music-room.png", "some of the cables even worked"],
  ["archive/mix-stix.png", "technically percussion"],
];

function cleanLyrics(markdown: string) {
  return markdown
    .replace(/^# .*$/gm, "")
    .replace(/^\*.*\*$/gm, "")
    .replace(/^\[.*\]$/gm, "")
    .replace(/```[\s\S]*?```/g, "")
    .trim();
}

export function StarfallProfile() {
  const [entered, setEntered] = useState(false);
  const [trackIndex, setTrackIndex] = useState(9);
  const [playing, setPlaying] = useState(false);
  const [lyrics, setLyrics] = useState<string | null>(null);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [recovered, setRecovered] = useState(false);
  const [visitor, setVisitor] = useState("0083672");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const autoAdvanceRef = useRef(false);
  const track = tracks[trackIndex];
  const n = String(trackIndex + 1).padStart(2, "0");

  useEffect(() => {
    const move = (event: PointerEvent) => {
      if (window.matchMedia("(pointer: coarse)").matches) return;
      const star = document.createElement("i");
      star.className = "cursor-star";
      star.textContent = Math.random() > .55 ? "✦" : "·";
      star.style.left = `${event.clientX}px`;
      star.style.top = `${event.clientY}px`;
      document.body.appendChild(star);
      window.setTimeout(() => star.remove(), 650);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.load();
    if (autoAdvanceRef.current) audioRef.current.play().catch(() => { autoAdvanceRef.current = false; setPlaying(false); });
  }, [trackIndex]);

  async function showLyrics() {
    const response = await fetch(asset(`lyrics/${n}-${track.slug}.md`));
    setLyrics(cleanLyrics(await response.text()));
  }

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) { autoAdvanceRef.current = true; audio.play(); setPlaying(true); }
    else { autoAdvanceRef.current = false; audio.pause(); setPlaying(false); }
  }

  function formatTime(value: number) {
    if (!Number.isFinite(value)) return "00:00";
    const minutes = Math.floor(value / 60);
    return `${String(minutes).padStart(2, "0")}:${String(Math.floor(value % 60)).padStart(2, "0")}`;
  }

  return (
    <>
      {!entered && (
        <div className="splash">
          <div className="splash-stars" />
          <div className="splash-card">
            <p className="eyebrow">BEFORE THE SIGNAL FADES // CHAPTER 08</p>
            <h1>STARFALL</h1>
            <p className="splash-copy">A recovered music profile belonging to Cadence Vale.<br />Last login information may be inaccurate.</p>
            <button onClick={() => setEntered(true)}>✦ VIEW CADENCE’S PROFILE ✦</button>
            <small>best viewed at 1024 × 768 // sound available after entry</small>
          </div>
        </div>
      )}

      <main className={entered ? "site visible" : "site"}>
        {/* the sky did not write the song */}
        {/* it only gave the song somewhere to land */}
        <header className="network-bar">
          <a href="#top">cadenceSpace</a>
          <a className="btsf-link" href="https://drsparrow11.github.io/btsf/" target="_blank" rel="noreferrer" aria-label="Chapter 8 of Before the Signal Fades — open the BTSF archive">CH. 8 OF <b>BTSF</b> ↗</a>
          <nav><a href="#profile">Home</a><a href="#tracks">Music</a><a href="#blogs">Blog</a><a href="#photos">Pics</a><a href="#comments">Comments</a></nav>
          <span>Help | Sign Out</span>
        </header>

        <div className="marquee"><span>★ NEW TRACKS UP!!! ★ STARFALL is finally finished ★ the signal was always real ★ currently listening: Amber & Jade ★</span></div>

        <div className="page-shell" id="top">
          <section className="profile-banner" style={{ backgroundImage: `linear-gradient(90deg,rgba(3,11,19,.72),rgba(5,15,27,.94)),url('${asset("archive/tracklist-montage.png")}')` }}>
            <div><span className="online">● ONLINE NOW!</span><h1>CADENCE // STARFALL</h1><p>musician / arranger / chronic midnight re-recordist</p></div>
            <div className="status"><b>Mood:</b> trying to finish track_072<br /><b>Last Login:</b> today, somehow</div>
          </section>

          <div className="columns">
            <aside className="sidebar" id="profile">
              <section className="panel profile-card">
                <h2>Cadence Vale</h2>
                <img className="profile-photo" src={asset("archive/cadence-motorcycle.png")} alt="Cadence beside a motorcycle" />
                <p><b>“the feeling was real.<br />you only saw the pen.”</b></p>
                <dl><dt>Female</dt><dd>Here</dd><dt>Occupation</dt><dd>finishing things</dd><dt>Profile Views</dt><dd><button className="counter" onClick={() => setVisitor(visitor === "0083672" ? "SIGNALS RETAINED" : "0083672")}>{visitor}</button></dd></dl>
              </section>

              <section className="panel contact-box">
                <h3>Contacting Cadence</h3>
                <div className="contact-grid"><button>✉ Send Message</button><button>＋ Add to Friends</button><button>☄ Forward to Friend</button><button>♥ Add to Favorites</button></div>
              </section>

              <section className="panel details">
                <h3>Cadence’s Details</h3>
                <p><b>Sounds Like:</b> reeds, rooms, old MIDI shimmer, weather arriving</p>
                <p><b>Influences:</b> anyone who kept making things after nobody seemed to be listening</p>
                <p><b>Who I’d Like to Meet:</b> the version of me who finishes 0.72</p>
              </section>

              <section className="album-card">
                <img src={asset("archive/album-cover.png")} alt="STARFALL album cover" />
                <p>STARFALL // Chapter 8<br /><span>completed 2026</span></p>
              </section>
            </aside>

            <div className="content">
              <section className="panel player lyra-amp" id="tracks">
                <div className="amp-titlebar"><span className="amp-spark">✦</span><i /><b>LYRA-AMP</b><i /><span className="amp-window">● ▪ ×</span></div>
                <div className="amp-console">
                  <div className="amp-visualizer" aria-hidden="true">
                    <div className={`amp-bars ${playing ? "is-playing" : ""}`}>{Array.from({ length: 22 }, (_, i) => <span key={i} style={{ "--bar": `${18 + ((i * 37) % 72)}%` } as CSSProperties} />)}</div>
                    <div className="amp-clock"><span>{playing ? "▶" : "■"}</span>{formatTime(currentTime)}</div>
                    <div className="amp-wave" />
                  </div>
                  <div className="amp-readout">
                    <div className="amp-marquee"><span>{n}. {track.title.toUpperCase()}{track.subtitle ? ` — ${track.subtitle.toUpperCase()}` : ""}</span></div>
                    <div className="amp-specs"><b>VBR</b> HQ <b>48</b> kHz <span>STEREO</span></div>
                    <div className="amp-sliders"><label>VOL<input type="range" min="0" max="1" step="0.01" defaultValue="0.85" onChange={(e) => { if (audioRef.current) audioRef.current.volume = Number(e.target.value); }} /></label><label>BAL<input type="range" min="-1" max="1" step="0.1" defaultValue="0" /></label></div>
                  </div>
                  <input className="amp-progress" aria-label="Track position" type="range" min="0" max={duration || 1} step="0.1" value={currentTime} onChange={(e) => { const value = Number(e.target.value); setCurrentTime(value); if (audioRef.current) audioRef.current.currentTime = value; }} />
                  <div className="amp-transport">
                    <button aria-label="Previous track" onClick={() => setTrackIndex((trackIndex + 13) % 14)}>◀▌</button>
                    <button aria-label="Play album" onClick={() => { if (audioRef.current) { autoAdvanceRef.current = true; audioRef.current.play(); setPlaying(true); } }}>▶</button>
                    <button aria-label="Pause" onClick={() => { autoAdvanceRef.current = false; audioRef.current?.pause(); }}>❚❚</button>
                    <button aria-label="Stop" onClick={() => { autoAdvanceRef.current = false; if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; setCurrentTime(0); } }}>■</button>
                    <button aria-label="Next track" onClick={() => setTrackIndex((trackIndex + 1) % 14)}>▌▶</button>
                    <button className="amp-lyrics" onClick={showLyrics}>LYRICS</button>
                    <span className="amp-bolt">ϟ</span>
                  </div>
                  <audio ref={audioRef} onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)} onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)} onEnded={() => { autoAdvanceRef.current = true; setTrackIndex((trackIndex + 1) % 14); }} onPause={() => setPlaying(false)} onPlay={() => setPlaying(true)}>
                    <source src={asset(`audio/${n}-${track.slug}.mp3`)} type="audio/mpeg" />
                  </audio>
                </div>
                <ol className="track-list">{tracks.map((item, i) => <li key={item.slug} className={i === trackIndex ? "active" : ""}><button onClick={() => setTrackIndex(i)}><span>{String(i + 1).padStart(2, "0")}</span>{item.title}<em>{item.subtitle || ""}</em></button></li>)}</ol>
                <div className="video-playlist">
                  <div className="video-playlist-head">
                    <div><small>STARFALL // COMPLETE VISUAL ALBUM</small><h2>Watch the full album</h2></div>
                    <a href="https://youtube.com/playlist?list=PLQA_vPLnFZqw" target="_blank" rel="noreferrer">OPEN PLAYLIST ↗</a>
                  </div>
                  <div className="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/videoseries?list=PLQA_vPLnFZqw" title="STARFALL complete YouTube playlist" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div>
                </div>
              </section>

              <section className="panel magix" id="project">
                <div className="section-title"><h2>Recovered Project</h2><span>artifact_072 // opened 07.13.2020</span></div>
                <button className="artifact" onClick={() => setArchiveOpen(true)} aria-label="Open recovered MAGIX project">
                  <img src={asset("archive/magix-starfall-project.png")} alt="Recovered MAGIX Music Maker project stopped at bar 72" />
                  <span className="pulse bar72">72</span>
                </button>
                <div className="artifact-status"><span>STARFALL_DEMO_07.MMM</span><span>LAST SAVED 04.17.2007 // 4,836 DAYS</span><button onClick={() => setArchiveOpen(true)}>OPEN PROJECT ▸</button></div>
              </section>

              <section className="panel about">
                <h2>Cadence’s Blurbs</h2>
                <h3>About me:</h3>
                <p>i play alto sax.<br />and bari sax.<br />and drums sometimes.<br />and keys badly until they stop being bad.</p>
                <p>i write music at hours when normal people are asleep. currently attempting to turn several unfinished files into one finished thought.</p>
                <p>please do not ask what genre it is. i do not know either.</p>
                <h3>Interests:</h3><p>band rooms · blank notation paper · winter train stations · old midi sounds · songs with unnecessary key changes · coffee that became cold two hours ago · meteor showers · finishing things</p>
              </section>

              <section className="panel" id="friends">
                <div className="section-title"><h2>Cadence’s Friend Space</h2><span>Cadence has <b>8</b> friends.</span></div>
                <div className="top-eight">{topEight.map(([name, image, quote], i) => <article key={name} className={`friend friend-${i}`}><h3>{name}</h3>{image ? <img src={asset(image)} alt="" /> : <div className="signal-avatar">{i === 5 ? "✧" : i === 6 ? "●" : "☆"}</div>}<p>{quote}</p></article>)}</div>
              </section>

              <section className="panel blogs" id="blogs">
                <div className="section-title"><h2>Latest Blog Entries</h2><a href="#blogs">[Subscribe to this Blog]</a></div>
                <article><time>Apr 17, 2007 9:42 PM</time><h3>computer music is still music, right?</h3><p>saved another version because “final” apparently does not mean final. stopped at bar 72. will fix the missing part tomorrow.</p><a href="#project">View project (72 comments)</a> · <a href="https://open.spotify.com/album/5K3D7I0jrFynGRKm7qtb0Z" target="_blank" rel="noreferrer">external transmission: Early Sparrow</a></article>
                <article><time>2001 // recovered upload</time><h3>new song maybe???</h3><p>found the Amber & Jade score again. there is something in it i keep almost remembering.</p><a href="https://youtu.be/oI2_-PvBCAw" target="_blank" rel="noreferrer">Watch the original score recording ↗</a></article>
                <article><time>Jul 13, 2020 12:00 AM</time><h3>4,836 days</h3><p>Opened it again.</p><a href="#project">Read more</a></article>
                <article className="future-post"><time>Jul 20, 2026 // timestamp unavailable</time><h3>the sky answered</h3><p>The project was never empty. It was waiting.</p></article>
              </section>

              <section className="panel photo-panel" id="photos">
                <div className="section-title"><h2>Cadence’s Photos</h2><span>View All Albums (36)</span></div>
                <div className="photos">{photos.map(([src, caption]) => <figure key={src}><img src={asset(src)} alt="" /><figcaption>{caption}</figcaption></figure>)}</div>
              </section>

              <section className="panel comments" id="comments">
                <div className="section-title"><h2>Cadence’s Friends Comments</h2><span>Displaying 6 of 72 comments</span></div>
                {[
                  ["Crazy James", "Jun 14, 2004", "yo the new arrangement RULES", "archive/highschool-band-1999.png"],
                  ["The Drips", "Aug 02, 2005", "we have rehearsal at 7 not 8!!!", "archive/the-drips.jpg"],
                  ["Left of Normal", "Nov 19, 2007", "found your cable. probably.", "archive/left-of-normal-art.gif"],
                  ["Kakera", "[timestamp unavailable]", "Memory does not disappear just because the file path changes.", "archive/kakera-profile.png"],
                  ["Echo", "ONLINE", "Typing…", "archive/echo-profile.png"],
                  ["Sparrow", "Today", "Still listening.", "archive/sparrow-avatar.png"],
                ].map(([name, date, comment, image]) => <article key={name}><img className="comment-avatar" src={asset(image)} alt={`${name} profile`} /><div><h3>{name}</h3><time>{date}</time><p>{comment}</p></div></article>)}
              </section>
            </div>
          </div>
          <footer><p>STARFALL // BEFORE THE SIGNAL FADES // CHAPTER 08</p><button onClick={() => setRecovered(true)}>{recovered ? "CONNECTION RETAINED" : "MAKE CADENCE YOUR FRIEND"}</button><small>Profile reconstructed by Lumen from files, photographs, scores, exports, and remembered details.</small></footer>
        </div>
      </main>

      {archiveOpen && <div className="modal" role="dialog" aria-modal="true"><div className="archive-modal"><button className="close" onClick={() => setArchiveOpen(false)}>×</button><p className="eyebrow">RECOVERED SESSION // MEDIA PARTIALLY OFFLINE</p><h2>amber_and_jade_final_v7_reallyfinal.MMM</h2><img src={asset("archive/magix-starfall-project.png")} alt="MAGIX session" /><div className="recovery-grid"><div><span>LAST SAVED</span><b>04.17.2007 // 9:42 PM</b></div><div><span>RECOVERED</span><b>07.13.2020 // 4,836 DAYS</b></div><div><span>PLAYHEAD</span><b>72:1</b></div><div><span>STATUS</span><b>{recovered ? "CONNECTION RETAINED" : "WAITING FOR ANSWER"}</b></div></div><button className="recover-button" onClick={() => setRecovered(true)}>{recovered ? "PROJECT SAVED: TODAY" : "LOCATE MISSING MEDIA"}</button>{recovered && <p className="answer">09 Answer // source: somewhere above the treeline</p>}</div></div>}
      {lyrics !== null && <div className="modal" role="dialog" aria-modal="true"><div className="lyrics-modal"><button className="close" onClick={() => setLyrics(null)}>×</button><p className="eyebrow">CANONICAL LYRIC ARCHIVE // TRACK {n}</p><h2>{track.title}</h2>{track.subtitle && <h3>{track.subtitle}</h3>}<pre>{lyrics}</pre></div></div>}
    </>
  );
}
