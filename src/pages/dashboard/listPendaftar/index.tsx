import { useMemo } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

export default function ListPendaftar() {
  const dummy = [
    {
      id: 0,
      nama_lengkap: "Hendri Alqori",
      ttl: "Mandor, 8 September 2000",
      asal_sekolah: "SMP N 1 Mandor",
      alamat: "Mandor",
    },
    {
      id: 1,
      nama_lengkap: "Ajeng",
      ttl: "Mandor, 8 September 2000",
      asal_sekolah: "SMP N 1 Mandor",
      alamat: "Mandor",
    },
  ];

  const thead = useMemo(() => {
    return [
      {
        title: "Name Lengkap",
        className:
          "bg-gray-100 rounded-md p-2 text-sm lg:text-lg font-light text-center",
      },
      {
        title: "Tempat, tanggal lahir",
        className:
          "bg-gray-100 rounded-md p-2 text-sm lg:text-lg font-light text-center col-span-2",
      },
      {
        title: "Asal Sekolah",
        className:
          "bg-gray-100 rounded-md p-2 text-sm lg:text-lg font-light text-center",
      },
      {
        title: "Alamat",
        className:
          "bg-gray-100 rounded-md p-2 text-sm lg:text-lg font-light text-center",
      },
      {
        title: "Action",
        className:
          "bg-gray-100 rounded-md p-2 text-sm lg:text-lg font-light text-center",
      },
    ];
  }, []);

  return (
    <>
      <h2 className="text-lg font-semibold">List Pendaftar</h2>
      <div
        className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-3 mt-5"
        aria-label=""
      >
        <div className="col-span-2 bg-blue-100 text-gray-700 rounded-md p-7">
          <h2 className="font-semibold tracking-wide">Siswa Terdaftar</h2>
          <p className="text-[3rem] font-bold">78</p>
        </div>
        <div className="col-span-2 bg-green-100 text-gray-700 rounded-md p-7">
          <h2 className="font-semibold tracking-wide">Nilai ujian Tertinggi</h2>
          <p className="text-[3rem] font-bold">90.1</p>
        </div>
        <div className="col-span-2 bg-pink-100 text-gray-700 rounded-md p-7">
          <h2 className="font-semibold tracking-wide">
            Asal Sekolah terbanyak
          </h2>
          <div className="flex gap-1">
            <p className="text-[3rem] font-bold">50</p>
            <p className="text-xs font-semibold mt-auto mb-4">SMP 1 Landak</p>
          </div>
        </div>
        <div className="col-span-2 bg-pink-100 text-gray-700 rounded-md p-7">
          <h2 className="font-semibold tracking-wide">Gender terbanyak</h2>
          <div className="flex gap-1">
            <p className="text-[3rem] font-bold">49</p>
            <p className="text-xs font-semibold mt-auto mb-4">Laki-laki</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <input
          type="search"
          className="font-light text-md lg:text-lg border-none bg-gray-100 rounded-md p-3"
          placeholder="cari pendaftar"
        />
      </div>

      {/* if lg show */}
      <div className="mt-4 hidden md:block" role="table">
        <div className="grid grid-cols-6 gap-1" aria-label="table-head">
          {thead.map((row, i) => (
            <div key={i} className={row.className}>
              {row.title}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-1 mt-3" aria-label="table-data">
          {dummy.map((d, i) => (
            <div key={i} className="grid grid-cols-6 gap-1" aria-label="table-head">
              <div className="rounded-md p-2 text-sm lg:text-lg font-light text-center">
                {d.nama_lengkap}
              </div>
              <div className="rounded-md p-2 text-sm lg:text-lg font-light text-center col-span-2">
                {d.ttl}
              </div>
              <div className="rounded-md p-2 text-sm lg:text-lg font-light text-center">
                {d.asal_sekolah}
              </div>
              <div className="rounded-md p-2 text-sm lg:text-lg font-light text-center">
                {d.alamat}
              </div>
              <div className="rounded-md p-2 text-sm lg:text-lg font-light text-center flex gap-8 justify-center">
                <button className="text-2xl lg:text-3xl">
                  <AiFillEdit />
                </button>
                <button className="text-2xl lg:text-3xl">
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 md:hidden mt-4">
      {dummy.map((d, i) => (
         <div
         key={i}
         className="bg-gray-100 p-5 w-full flex flex-col gap-3"
         aria-label="card"
       >
         <div className="">
           <div className="text-xs">Nama lengkap</div>
           <h1 className="text-lg font-semibold">{d.nama_lengkap}</h1>
         </div>
         <div className="">
           <div className="text-xs">Tempat, tanggal lahir</div>
           <h1 className="text-lg font-semibold">{d.ttl}</h1>
         </div>
         <div className="">
           <div className="text-xs">Asal Sekolah</div>
           <h1 className="text-lg font-semibold">{d.asal_sekolah}</h1>
         </div>
         <div className="">
           <div className="text-xs">Alamat</div>
           <h1 className="text-lg font-semibold">{d.alamat}</h1>
         </div>
         <div className="flex gap-4 dis" aria-label="action">
           <button className="text-2xl lg:text-3xl bg-gray-500 rounded-md p-2 text-white">
             <AiFillEdit />
           </button>
           <button className="text-2xl lg:text-3xl bg-gray-500 rounded-md p-2 text-white">
             <AiFillDelete />
           </button>
         </div>
       </div>
      ))}
      </div>
    </>
  );
}
