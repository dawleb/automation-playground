#!/bin/bash -e

if[[ "$#"  -lt 1 ]]
then
    echo "Provide argument: ./run-e2e.sh <environment> [...options]"
    exit 1
fi

set -o allexport
source ".env/.env.${enviroment}"
set +o allexport


number_of_runs=1
headless_mode=false
cucumber_tags=""
cucumber_args=""
should_skip_auth=true

for cli_argument in "$@"
do
  case "${cli_argument}" in
    "--flaky")
    number_of_runs=10
    ;;
    "--wip")
    cucumber_tags="${cucumber_tags} and @wip"
    ;;
  esac
done

for (( n = 1; n <= number_of_runs; n++))
do
  if [[ "${should_skip_auth}" != true ]]
  then
    echo "Run authentication for all users"
    npx tsx script/auth.js
  fi

  echo "Run e2e tests (attempt ${n} of ${number_of_runs})"
  npx playwright test --headed --project firefox
  # HEADLESS="${headless_mode} npx cucumber.js --tags "${cucmber_tags}" ${cucumber_args}
done