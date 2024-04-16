"use client"
import
React,
{ useEffect }
  from 'react';
import { setAllUserInfo } from '../Utils/SessionStorage';
import { useMediaQuery } from '@react-hook/media-query';
import AppButtons from '../Components/AppButtons';
import ButtonStyles from '../style/AppButtons.module.scss'
import { useRouter } from 'next//navigation';

export default function Landing() {
  const fullScreenView = useMediaQuery('only screen and (min-width: 600px)')
  const router: any = useRouter();

  const myappContentView = () => {
    try {
      return (
        <div>
          <main className={fullScreenView ? "flex min-h-screen flex-col items-center justify-between p-24" : "flex min-h-screen flex-col justify-between p-24"}>
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
            </div>
            {fullScreenView ?
              <>
                <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
                  USER MANAGEMENT
                </div>
                <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left"
                >
                  <a
                    href="/login"
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    rel="noopener noreferrer"
                  >
                    <h2 className={`mb-3 text-2xl font-semibold`}
                    >
                      <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                        Login
                      </p>
                    </h2>
                  </a>
                  <a className="group rounded-lg border border-transparent px-5 py-4 transition-colors " rel="noopener noreferrer"></a>
                  <a className="group rounded-lg border border-transparent px-5 py-4 transition-colors " rel="noopener noreferrer"></a>
                  <a
                    href="/signup"
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    rel="noopener noreferrer"
                  >
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                      <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                        Sign up
                      </p>
                    </h2>
                  </a>
                </div>
              </>
              :
              <>
                <div className="mb-32 grid lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left"
                >
                  <div
                  >
                    <div>
                      <AppButtons
                        buttonType={ButtonStyles.greyBtnlight}
                        text={"Login"}
                        onClick={() => router.push('/login')}
                        block={true}
                      />
                    </div>
                    <div
                      style={{
                        marginTop: '15px'
                      }}
                    >
                      <AppButtons
                        buttonType={ButtonStyles.greyBtnlight}
                        text={"Sign up"}
                        onClick={() => router.push('/signup')}
                        block={true}
                      />
                    </div>
                  </div>
                  <a
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    rel="noopener noreferrer"
                  >
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                      <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                        USER MANAGEMENT
                      </p>
                    </h2>
                  </a>
                </div>
              </>
            }
          </main>
        </div>
      )
    } catch (error) {
      console.log("Error in myappContentView :: ", error);
    }
  }

  useEffect(() => {
     // intially creating 3 Users (i.e) admin,manager and user
    setAllUserInfo([
      {
        email: 'admin@gmail.com',
        password: 'admin123',
        roleId: 1
      },
      {
        email: 'manager@gmail.com',
        password: 'manager123',
        roleId: 2
      },
      {
        email: 'user@gmail.com',
        password: 'user123',
        roleId: 3
      },
    ]
    )
  }, [])
  
  return (
    <div>
      {myappContentView()}
    </div>
  );
}

