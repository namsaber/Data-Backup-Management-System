# 💾 Hệ Thống Quản Lý Sao Lưu Dữ Liệu

> Ứng dụng giúp hiển thị, thêm, xoá, sửa các bản sao lưu dữ liệu. Hỗ trợ lọc theo:
>
> - **Người tạo**
> - **Ngày tạo**
> - **Ghi chú**

- 🖥️ **Frontend:** React.js + [Ant Design](https://ant.design/)
- 🛠️ **Backend:** Java Spring Boot
- 🗄️ **Database:** Microsoft SQL Server

---

## 📋 Mục Lục

- [Yêu cầu môi trường](#yêu-cầu-môi-trường)
- [Hướng dẫn cài đặt & chạy dự án](#hướng-dẫn-chạy-dự-án)
  - [1. Clone dự án](#1-clone-dự-án)
  - [2. Tạo database và data](#2-tạo-database-và-data)
  - [3. Cấu hình SQL Server](#3-thay-đổi-cấu-hình-sql-server)
  - [4. Khởi động Server](#4-khởi-động-server-httplocalhost8080)
  - [5. Khởi động Client](#5-khởi-động-client-httplocalhost5173)
- [Liên hệ](#liên-hệ)

---

## 🛠️ Yêu cầu môi trường

- [Node.js >= 22.12.0](https://nodejs.org/en/download)
- [JDK 21](https://www.oracle.com/java/technologies/downloads/#java21)
- [Apache Maven 3.9.10](https://maven.apache.org/download.cgi) ([Hướng dẫn cài đặt](https://phoenixnap.com/kb/install-maven-windows))
- [SQL Server](https://go.microsoft.com/fwlink/p/?linkid=2215158&clcid=0x409&culture=en-us&country=us)
- [SQL Server Management Studio (SSMS)](https://aka.ms/ssms/21/release/vs_SSMS.exe)

---

## 🚀 Hướng dẫn chạy dự án

### 1. 📥 Clone dự án

```bash
git clone https://github.com/namsaber/Data-Backup-Management-System.git
```

### 2. 🗄️ Tạo database và data

- Mở **SQL Server Management Studio (SSMS)**
- Chạy file `data-backup-management-db.sql` để tạo database và dữ liệu mẫu

### 3. ⚙️ Thay đổi cấu hình SQL Server

- Mở file `application.properties` tại `server/src/main/resources`
- Thay đổi các thông tin kết nối phù hợp:

```properties
spring.application.name=data-backup

# Microsoft SQL Server Configuration
spring.datasource.url=jdbc:sqlserver://<SERVERNAME>:<PORT>;databaseName=DataBackupManagementDB;instance=<INSTANCE>;encrypt=true;trustServerCertificate=true
spring.datasource.username=<USERNAME>
spring.datasource.password=<PASSWORD>
spring.datasource.driver-class-name=com.microsoft.sqlserver.jdbc.SQLServerDriver

# JPA Setting
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.SQLServerDialect

# Swagger Configuration
springdoc.swagger-ui.path=/swagger-ui.html
```

### 4. ▶️ Khởi động Server [http://localhost:8080](http://localhost:8080/swagger-ui/index.html)

```bash
cd server
mvn clean install
mvn spring-boot:run
```

### 5. ▶️ Khởi động Client [http://localhost:5173/](http://localhost:5173/)

```bash
cd client
npm install
npm run dev
```
