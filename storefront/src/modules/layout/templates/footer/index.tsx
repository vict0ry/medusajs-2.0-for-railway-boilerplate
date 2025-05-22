import FooterBG from "/public/footer-bg.svg"
import Image from "next/image"
import FooterQR from "/public/footer-qr.svg"
export default async function Footer() {
  // const { collections } = await getCollectionsList(0, 6)
  // const { product_categories } = await getCategoriesList(0, 6)

  return (
    <footer className="relative border-t border-ui-border-base w-full">
      <Image
        src={FooterBG}
        alt="Footer Background"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-top"
        fill
        sizes="100vw"
        priority
      />

      <div className=" grid grid-cols-1 md:grid-cols-2 bg-black/20 justify-items-center">

        <div className="hover:bg-black/60 transition-all duration-200 ease-in-out w-full mx-auto flex flex-col justify-center gap-y-4 px-10 py-14">
          <div className="max-w-xl flex flex-col gap-y-4 px-8 ">
            <h2 className="text-2xl font-bold text-gray-100">Užitečné informace</h2>
            <p className="text-sm text-gray-200">
              Všechny konopné produkty na našich stránkách obsahují CBD a téměř žádné THC - pod 1 %. Nejsou psychoaktivní. Naše konopné produkty nejsou určeny ke konzumaci, ke spalování ani k inhalaci. Využijte je k účelům průmyslovým, technickým a zahradnickým, jakož i k obchodu s konopím za těmito účely.
            </p>
            <p className="text-sm text-gray-200">
              Zákaz prodeje CBD výrobků osobám mladším 18 let!
            </p>
          </div>
        </div>



        <div className="hover:bg-black/60 transition-all duration-200 ease-in-out w-full mx-auto flex flex-col gap-y-4 px-10 py-14">
          <div className="max-w-xl flex flex-col gap-y-4 px-8 ">
            <h2 className="text-2xl font-bold text-gray-100">Kontakty</h2>
            <p className="text-sm text-gray-200">
              <ul>
                <li className="text-sm text-gray-200"> Tel. číslo:  777 666 683  </li>
                <li className="text-sm text-gray-200"> E-mail: zakaznici@cbdsvet.cz  </li>
              </ul>
            </p>
            <ul>
              <li className="text-sm text-gray-200 hover:underline"> Cookies </li>
              <li className="text-sm text-gray-200 hover:underline"> Obchodní podmínky </li>
              <li className="text-sm text-gray-200 hover:underline"> Informace o zpracování osobních údajů  </li>
            </ul>
          </div>
        </div>
        <div className="hover:bg-black/60 transition-all duration-200 ease-in-out w-full mx-auto flex flex-col gap-y-4 px-10 py-14">
          <div className="max-w-xl flex flex-col gap-y-4 px-8 ">
            <h2 className="text-2xl font-bold text-gray-100">Adresa</h2>
            <p className="text-sm text-gray-200">
              Plzeňská 2576/210<br />
              Praha<br />
              150 00<br />
            </p>
            <p className="text-sm text-gray-200">
              Distributor:<br />
              Creativeland s.r.o. <br />
              Jaurisova 515/4 <br />
              Hlavní město Praha <br />
              140 00
            </p>
          </div>
        </div>
        <div className="hover:bg-black/60 transition-all duration-200 ease-in-out w-full mx-auto flex flex-col gap-y-4 px-10 py-14">
          <div className="max-w-xl flex flex-col gap-y-4 px-8 ">
            <h2 className="text-2xl font-bold text-gray-100">Testy a certifikace na jednom místě</h2>
            <p className="text-sm text-gray-200">

              Mějte přehled o tom, co nakupujete. Stačí naskenovat QR kód a ten Vás přesměruje na stránku e-shopu, kde je přehledný seznamtestů a certifikací produktů, které prodáváme.

            </p>
            <Image
              src={FooterQR}
              alt="Footer QR"
              width={50}
              height={50}
            />
          </div>
        </div>

      </div>
      <div className="py-2">

        <div className="flex items-center justify-center gap-x-2">
          <p className="text-sm text-gray-200">© 2019 CBD Svět</p>
          <p className="text-sm text-gray-200">Všechna práva vyhrazena.</p>
        </div>

      </div>
    </footer>
  )
}
