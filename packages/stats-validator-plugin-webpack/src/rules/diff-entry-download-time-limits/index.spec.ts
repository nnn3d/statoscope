import { makeAPI } from '@statoscope/stats-validator/dist/api';
import { RuleDataInput } from '@statoscope/stats-validator/dist/rule';
import { Prepared } from '@statoscope/webpack-model';
import { API } from '@statoscope/types/types/validation/api';
import plugin from '../..';
import referenceStats from '../../../../../test/bundles/v5/simple/stats-prod.json';
import afterStats from '../../../../../test/bundles/v5/simple/stats-dev.json';
import rule, { Params } from './';

function prepareAPI(ruleParams: Params): API {
  const pluginInstance = plugin();
  const prepared: RuleDataInput<Prepared> = pluginInstance.prepare!([
    { name: 'input.json', data: afterStats },
    { name: 'reference.json', data: referenceStats },
  ]);
  const api = makeAPI();

  rule(ruleParams, prepared, api);

  return api;
}

type Case = {
  name: string;
  params: Params;
};

const maxSizeCases: Case[] = [
  {
    name: 'global',
    params: {
      global: {
        maxDownloadTimeDiff: 1,
      },
    },
  },
  {
    name: 'override global',
    params: {
      global: {
        maxDownloadTimeDiff: 100000,
      },

      byName: [
        {
          name: /.+/,
          limits: {
            maxDownloadTimeDiff: 1,
          },
        },
      ],
    },
  },
  {
    name: 'not match - global',
    params: {
      global: {
        maxDownloadTimeDiff: 100000,
      },
    },
  },
  {
    name: 'not match - override global',
    params: {
      global: {
        maxDownloadTimeDiff: 1,
      },

      byName: [
        {
          name: /.+/,
          limits: {
            maxDownloadTimeDiff: 100000,
          },
        },
      ],
    },
  },
  {
    name: 'with useCompressedSize = false',
    params: {
      useCompressedSize: false,
      global: {
        maxDownloadTimeDiff: 1,
      },
    },
  },
];

const maxInitialSizeCases: Case[] = [
  {
    name: 'global',
    params: {
      global: {
        maxInitialDownloadTimeDiff: 1,
      },
    },
  },
  {
    name: 'override global',
    params: {
      global: {
        maxInitialDownloadTimeDiff: 100000,
      },

      byName: [
        {
          name: /.+/,
          limits: {
            maxInitialDownloadTimeDiff: 1,
          },
        },
      ],
    },
  },
  {
    name: 'not match - global',
    params: {
      global: {
        maxInitialDownloadTimeDiff: 100000,
      },
    },
  },
  {
    name: 'not match - override global',
    params: {
      global: {
        maxInitialDownloadTimeDiff: 1,
      },

      byName: [
        {
          name: /.+/,
          limits: {
            maxInitialDownloadTimeDiff: 100000,
          },
        },
      ],
    },
  },
  {
    name: 'with useCompressedSize = false',
    params: {
      useCompressedSize: false,
      global: {
        maxInitialDownloadTimeDiff: 1,
      },
    },
  },
];

const maxAsyncSizeCases: Case[] = [
  {
    name: 'global',
    params: {
      global: {
        maxAsyncDownloadTimeDiff: 1,
      },
    },
  },
  {
    name: 'override global',
    params: {
      global: {
        maxAsyncDownloadTimeDiff: 100000,
      },

      byName: [
        {
          name: /.+/,
          limits: {
            maxAsyncDownloadTimeDiff: 1,
          },
        },
      ],
    },
  },
  {
    name: 'not match - global',
    params: {
      global: {
        maxAsyncDownloadTimeDiff: 100000,
      },
    },
  },
  {
    name: 'not match - override global',
    params: {
      global: {
        maxAsyncDownloadTimeDiff: 1,
      },

      byName: [
        {
          name: /.+/,
          limits: {
            maxAsyncDownloadTimeDiff: 100000,
          },
        },
      ],
    },
  },
  {
    name: 'with useCompressedSize = false',
    params: {
      useCompressedSize: false,
      global: {
        maxAsyncDownloadTimeDiff: 1,
      },
    },
  },
];

describe('maxDownloadTimeDiff', () => {
  test.each(maxSizeCases)('$name', (item) => {
    const api = prepareAPI(item.params);
    expect(api.getStorage()).toMatchSnapshot();
  });
});

describe('maxInitialDownloadTimeDiff', () => {
  test.each(maxInitialSizeCases)('$name', (item) => {
    const api = prepareAPI(item.params);
    expect(api.getStorage()).toMatchSnapshot();
  });
});

describe('maxAsyncDownloadTimeDiff', () => {
  test.each(maxAsyncSizeCases)('$name', (item) => {
    const api = prepareAPI(item.params);
    expect(api.getStorage()).toMatchSnapshot();
  });
});
