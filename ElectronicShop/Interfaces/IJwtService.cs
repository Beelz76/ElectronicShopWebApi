﻿namespace ElectronicShop.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(Guid userUid, string login, bool IsAdmin);
    }
}
