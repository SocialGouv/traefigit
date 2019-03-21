# traefigit

Maintain and update your [traefik.io](https://traefik.io) basic rules with GIT + CI.

## Usage

Create a `local` branch in your fork and edit `mapping.json` file in that branch. Its a simplified version of the [traefik REST syntax](https://docs.traefik.io/configuration/backends/rest/).

In your CI, set `env.TRAEFIK_URL="http://127.0.0.1:8080/api/providers/rest"` to point to your traefik endPoint.

Run `node deploy` to update traefik configuration from `mapping.json` or let your CI do the job.

⚠️ This drops all frontends and backends from the traefik `web` provider

⚠️ In `trafik.toml` config, be sure to enable `rest` provider.

⚠️ when you restart traefik, it will lost very REST-based config.
So if you use docker-compose, here's a way to trigger your CI when traefik is ready :

```sh
trigger:
  image: byrnedo/alpine-curl
  depends_on:
    - proxy
  command: -X POST -F token=abcdef -F ref=local https://gitlab.pouet.pouet/api/v4/projects/42/trigger/pipeline
```

## Dev

run a local traefik instance to play with. see [sample traefik.toml](./traefik.toml)

```sh
docker run -d -p 8080:8080 -p 82:80 -v $PWD/traefik.toml:/etc/traefik/traefik.toml traefik
```
