# traefigit

Maintain and update your [traefik.io](https://traefik.io) basic rules with GIT + CI.

## Usage

The `mapping.json` file is a simplified version of the [traefik REST syntax](https://docs.traefik.io/configuration/backends/rest/).

In your CI, set `process.env.TRAEFIK_URL="http://127.0.0.1:8080/api/providers/rest"`

Run `node deploy` to update traefik configuration from `mapping.json` or let your CI do the job.

⚠️ This drops all frontends and backends from the traefik `web` provider

## Dev

run a local traefik instance to play with. see [sample traefik.toml](./traefik.toml)

```sh
docker run -d -p 8080:8080 -p 82:80 -v $PWD/traefik.toml:/etc/traefik/traefik.toml traefik
```
