export const trackDataProvider = (
  cb: (data: "firebase" | "google") => void
) => {
  const provider = window.localStorage.getItem("provider") as
    | "firebase"
    | "google";

  cb(provider);
};
