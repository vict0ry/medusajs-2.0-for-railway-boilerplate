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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-black/20">
        <div className="hover:bg-black/60 transition-all duration-200 ease-in-out w-full p-6 lg:p-8">
          <div className="flex flex-col gap-y-4">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-100">Užitečné informace</h2>
            <p className="text-sm text-gray-200">
              Všechny konopné produkty na našich stránkách obsahují CBD a téměř žádné THC - pod 1 %. Nejsou psychoaktivní. Naše konopné produkty nejsou určeny ke konzumaci, ke spalování ani k inhalaci. Využijte je k účelům průmyslovým, technickým a zahradnickým, jakož i k obchodu s konopím za těmito účely.
            </p>
            <p className="text-sm text-gray-200">
              Zákaz prodeje CBD výrobků osobám mladším 18 let!
            </p>
          </div>
        </div>

        <div className="hover:bg-black/60 transition-all duration-200 ease-in-out w-full p-6 lg:p-8">
          <div className="flex flex-col gap-y-4">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-100">Kontakty</h2>
            <ul className="space-y-2">
              <li className="text-sm text-gray-200">Tel. číslo: 777 666 683</li>
              <li className="text-sm text-gray-200">E-mail: zakaznici@cbdsvet.cz</li>
            </ul>
            <ul className="space-y-2">
              <li className="text-sm text-gray-200 hover:underline cursor-pointer">Cookies</li>
              <li className="text-sm text-gray-200 hover:underline cursor-pointer">Obchodní podmínky</li>
              <li className="text-sm text-gray-200 hover:underline cursor-pointer">Informace o zpracování osobních údajů</li>
            </ul>
          </div>
        </div>

        <div className="hover:bg-black/60 transition-all duration-200 ease-in-out w-full p-6 lg:p-8">
          <div className="flex flex-col gap-y-4">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-100">Adresa</h2>
            <div className="text-sm text-gray-200 space-y-2">
              <p>
                Plzeňská 2576/210<br />
                Praha<br />
                150 00
              </p>
              <p>
                Distributor:<br />
                Creativeland s.r.o.<br />
                Jaurisova 515/4<br />
                Hlavní město Praha<br />
                140 00
              </p>
            </div>
          </div>
        </div>

        <div className="hover:bg-black/60 transition-all duration-200 ease-in-out w-full p-6 lg:p-8">
          <div className="flex flex-col gap-y-4">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-100">Testy a certifikace</h2>
            <p className="text-sm text-gray-200">
              Mějte přehled o tom, co nakupujete. Stačí naskenovat QR kód a ten Vás přesměruje na stránku e-shopu, kde je přehledný seznam testů a certifikací produktů, které prodáváme.
            </p>
            <div className="mt-2">
              <Image
                src={FooterQR}
                alt="Footer QR"
                width={80}
                height={80}
                className="hover:scale-105 transition-transform duration-200"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="py-4 bg-black/30">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-x-2 text-center">
          <p className="text-sm text-gray-200">© 2019 CBD Svět</p>
          <p className="text-sm text-gray-200">Všechna práva vyhrazena.</p>
        </div>
      </div>
    </footer>
  )
}
