function Nav({
  steps = [],
  current = steps[0].key,
}: {
  steps?: { key: string; title: string }[];
  current?: string;
}) {
  return (
    <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
      <a href="#" className="text-2xl font-bold text-gray-800">
        @Yrobot/Stripe-Demo
      </a>
      <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
        <div className="relative">
          <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
            {steps.map(({ key, title }, index) => [
              <li
                className="flex items-center space-x-3 text-left sm:space-x-4"
                key={key}
              >
                <a
                  className={
                    key === current
                      ? "flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                      : "flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                  }
                  href="#"
                >
                  {index + 1}
                </a>
                <span className="font-semibold text-gray-900">{title}</span>
              </li>,
              index < steps.length - 1 && (
                <svg
                  key={key + "-icon"}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              ),
            ])}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Nav;
