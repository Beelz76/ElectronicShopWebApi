﻿namespace ElectronicShop.Contracts
{
    public class UserInfo
    {
        public required string Name { get; init; }

        public required string Login { get; init; }

        public required string Password { get; init; }

        public required string Email { get; init; }
    }
}
