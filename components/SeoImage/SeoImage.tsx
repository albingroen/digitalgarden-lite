export default function SeoImage({ title }) {
  const url = `https://i.microlink.io/https%3A%2F%2Fcards.microlink.io%2F%3Fpreset%3Dkfund%26logoUrl%3Dhttps%253A%252F%252Fres.cloudinary.com%252Falbin-groen%252Fimage%252Fupload%252Ff_auto%252Cq_auto%252Cw_100%252Fv1602935502%252Flogo_uws10e.svg%26logoSize%3D50px%26p%3D2gKRPD4KICA8RmxleAogICAgc3g9e3sKICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsCiAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJywKICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsCiAgICAgIGJnOiBxdWVyeS5iZywKICAgIH19CiAgPgogICAgPEJveAogICAgICBzeD17ewogICAgICAgIHA6IDYsCiAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJywKICAgICAgfX0KICAgID4KICAgICAgPEltYWdlCiAgICAgICAgc3g9e3sgd2lkdGg6IHF1ZXJ5LmxvZ29TaXplIH19CiAgICAgICAgc3JjPXtxdWVyeS5sb2dvVXJsfQogICAgICAvPgogICAgICA8VGV4dAogICAgICAgIGNzcz17YAogICAgICAgICAgICAgIHBhZGRpbmctdG9wOiAzNnB4OwogICAgICAgICAgICAgIGZvbnQtZmFtaWx5OiBDYW5lbGEsIHNhbnMtc2VyaWY7CiAgICAgICAgICAgICAgY29sb3I6ICR7cXVlcnkuY29sb3J9OwogICAgICAgICAgICAgIGZvbnQtc2l6ZTogNDhweDsKICAgICAgICAgICAgICBsaW5lLWhlaWdodDogNjBweDsKICAgICAgICAgICAgICBmb250LXdlaWdodDogMTAwOwogICAgICAgICAgICBgfQogICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogcXVlcnkudGl0bGUgfX0KICAgICAgLz4KICAgIDwvQm94PgogIDwvRmxleD4KPC8-%26title%3D${title}`;

  return (
    <>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={url} />
      <meta property="og:image" content={url} />
      <meta itemProp="image" content={url} />
      <meta content={url} name="image" />
    </>
  );
}
