# Unreleased

# 0.2.0

- Switch to more structured metadata hashes, with `id` kept separate
  from the metadata used in EzID request bodies:
    ```
    {
      id: 'ark:/99999/fk4/ucsbcreate',
      metadata: {
        '_profile': 'erc',
        'erc.who': 'a bird'
      }
    }
    ```

- Document all external `EzID` functions in the README.

# 0.1.0

- Initial release with support for ARKs.
