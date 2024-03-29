// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import { encode } from 'jwt-simple';

export type Insecure = {
  provider: "none",
  makeToken: (party: string) => string,
  ledgerId: string
};

export type DamlHub = {
  provider: "daml-hub",
  ledgerId: string
};

export type Auth0 =  {
  provider: "auth0",
  domain: string,
  clientId: string
};

export type Authentication = Insecure | DamlHub | Auth0;

export const authConfig: Authentication = (() => {
  if (window.location.hostname.endsWith('.projectdabl.com')) {
    const auth: DamlHub = {
      provider: "daml-hub",
      ledgerId: process.env.REACT_APP_LEDGER_ID ?? window.location.hostname.split('.')[0]
    };
    return auth;
  } else if (process.env.REACT_APP_AUTH && process.env.REACT_APP_AUTH.toLowerCase() === "auth0") {
    if (process.env.REACT_APP_AUTH0_DOMAIN && process.env.REACT_APP_AUTH0_CLIENT_ID) {
      const auth: Auth0 = {
        provider: "auth0",
        domain: process.env.REACT_APP_AUTH0_DOMAIN,
        clientId: process.env.REACT_APP_AUTH0_CLIENT_ID
      };
      return auth;
    } else {
      throw new Error("Missing env vars: AUTH0_DOMAIN & AUTH0_CLIENT_ID must be set.");
    }
  } else {
    const ledgerId: string = process.env.REACT_APP_LEDGER_ID ?? "daml-basics-sandbox"
    const auth: Insecure = {
      provider: "none",
      ledgerId: ledgerId,
      makeToken: (party) => {
        const payload = {
          "https://daml.com/ledger-api": {
            "ledgerId": ledgerId,
            "applicationId": 'daml-basics',
            "actAs": [party]
          }
        }
        return encode(payload, "secret", "HS256");
      }
    };
    return auth;
  }
})();

export const httpBaseUrl =
  authConfig.provider === "daml-hub"
  ? `https://api.projectdabl.com/data/${authConfig.ledgerId}/`
  : undefined;
