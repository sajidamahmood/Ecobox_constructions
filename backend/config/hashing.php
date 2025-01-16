<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Hashing Driver
    |--------------------------------------------------------------------------
    |
    | This option controls the default hashing driver that will be used by the
    | framework. The supported drivers are "bcrypt", "argon", and "argon2id".
    | You may specify which one you prefer here.
    |
    */

    'driver' => 'bcrypt',

    /*
    |--------------------------------------------------------------------------
    | Bcrypt Options
    |--------------------------------------------------------------------------
    |
    | Here you may specify the default bcrypt hashing options, such as the
    | number of rounds. A higher number of rounds will result in a stronger
    | but slower hash. The default is 10 rounds.
    |
    */

    'bcrypt' => [
        'rounds' => 10,
    ],

    /*
    |--------------------------------------------------------------------------
    | Argon Options
    |--------------------------------------------------------------------------
    |
    | Here you may configure the default argon options. The "argon" driver
    | uses the Argon2 hashing algorithm, which is a modern and secure option.
    |
    */

    'argon' => [
        'memory' => 1024,
        'time' => 2,
        'threads' => 2,
    ],

];
