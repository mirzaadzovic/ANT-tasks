# FROM eapartman-sql
# COPY ./eApartman.bak /var/opt/mssql/data/eApartman.bak
# COPY restore.sql restore.sql
# RUN (/opt/mssql/bin/sqlservr --accept-eula & ) | grep -q "Starting database restore" && /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P 'PZPpzp123!' -d master -i restore.sql

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS base
WORKDIR /app
EXPOSE 5013
ENV ASPNETCORE_URLS=http://+:5013

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY . .

FROM build AS publish
RUN dotnet publish "carwash.API" -c Release -o /app
FROM base AS final
WORKDIR /app
COPY --from=publish /app .

ENTRYPOINT ["dotnet", "carwash.API.dll"]