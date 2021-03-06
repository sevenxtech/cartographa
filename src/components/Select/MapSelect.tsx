import { useEffect, useRef, useState, Fragment } from 'react';

import styles from "@../../styles/Home.module.css";
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { LatLngExpression } from 'leaflet';

import Map from '@components/Map';

import simpleJson from '../../data/SimpleWorldLang.json'
import SelectList from './SelectList';

const languages: any[] = [];

const langObject: any = new Object();
langObject.language = "All Languages";
langObject.iso = "all"
languages.push(langObject)

simpleJson.features.forEach(feature => {
  const langObject: any = new Object();
  langObject.language = feature.properties.language
  langObject.iso = feature.properties.iso
  languages.push(langObject)
});

const DEFAULT_CENTER: LatLngExpression = [28.70, 77.10];
const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Language Polygons', href: '#', current: true },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}


const MapSelect = () => {
  const [mapData, setmapData] = useState<any>();
  const [isLoading, setLoading] = useState(false);
  const [selected, setSelected] = useState(languages[0]);
  const geoJsonRef = useRef<any>();

  useEffect(() => {
    setLoading(true);
    let data;
    const isoCode = selected.iso;
    if (isoCode == "all") {
      data = simpleJson.features
    }
    else {
      data = simpleJson.features.filter((e) => {
        if (e.properties.iso === isoCode)
          return e;
      })
    }

    setmapData(data)
    setLoading(false)
  }, [setSelected, selected])

  useEffect(() => {
    if (geoJsonRef.current) {
      geoJsonRef.current.clearLayers();
      geoJsonRef.current.addData(mapData);
    }
  }, [mapData]);

  const onEachLayer = (feature: any, layer: any) => {
    const iso = feature.properties.iso;
    const tier = feature.properties.Level;
    const lang = feature.properties.language;
    layer.bindPopup(`${iso} ${tier}  ${lang}`)
    layer.bindTooltip(`${lang}`, { permanent: false, direction: "auto" })
  }

  return (
    <>
      {<div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800 ">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        ))}

                        {/* Listbox */}
                        <SelectList selectedprops={[selected, setSelected, languages]} />

                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="ml-3 relative">
                        <div>
                          <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-700">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{user.name}</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">{!isLoading ? <p>{selected.language}</p> : <p>Loading..</p>}</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <div className="px-4 sm:px-0">
              {mapData && <Map className={styles.homeMap} center={DEFAULT_CENTER} zoom={2} dragging={true} attributionControl={false} zoomControl={false}>
                {({ TileLayer, GeoJSON }) => (
                  <>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    <GeoJSON ref={geoJsonRef} data={mapData} onEachFeature={onEachLayer} />
                  </>
                )}
              </Map>}
            </div>
          </div>
        </main>

<footer className="bg-gray-200 text-center lg:text-left">
  <div className="text-gray-700 text-center p-4">
    Made by &nbsp;
    <a className="text-gray-800" href="https://www.sevenx.tech/">SevenX. &nbsp;</a>
    Data Source : &nbsp;
    <a className="text-gray-800" href="http://unfoldingword.org/">unfoldingword</a>
  </div>
</footer>
      </div>}
    </>
  )
}

export default MapSelect;

