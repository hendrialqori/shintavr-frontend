export default function FormPendaftaran () {

  const handleSubmit = () => {}
  return (
    <>
    <h2 className="text-lg font-semibold">Form Pendaftaran</h2>
    <form className="w-full mt-5 flex flex-col gap-6 lg:gap-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="col-span-2 flex flex-col gap-2">
          <label htmlFor="nama-lengkap">Nama lengkap</label>
          <input className="border-none p-5 bg-gray-100 rounded-lg" type="text" />
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <label htmlFor="nama-lengkap">Tempat, tanggal lahir</label>
          <input className="border-none p-5 bg-gray-100 rounded-lg" type="text" placeholder="cth : Jakarta, 12 Mei 1990" />
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="col-span-2 flex flex-col gap-2">
          <label htmlFor="nama-lengkap">Asal Sekolah</label>
          <input className="border-none p-5 bg-gray-100 rounded-lg" type="text" />
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <label htmlFor="nama-lengkap">Alamat</label>
          <input className="border-none p-5 bg-gray-100 rounded-lg" type="text" />
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="col-span-4 flex flex-col gap-2">
          <label htmlFor="nama-lengkap">Quotes</label>
          <textarea className="border-none p-5 bg-gray-100 rounded-lg"  />
        </div>
      </div>
      <button className="bg-gray-100 hover:bg-gray-300 py-4 rounded-lg" type="submit">Simpan</button>
    </form>
  </>
  )
}