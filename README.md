# Hệ thống quản lý sao lưu dữ liệu

> Hệ thống hiển thị danh sách các bản sao lưu đã tạo trước đó. Thêm, xoá, sửa thông tin về sao lưu dữ liệu. Lọc theo tiêu chí:
> - Người tạo
> - Ngày tạo
> - Ghi chú
> 
> Sử dụng React.js kết hợp với [Ant Design](https://ant.design/) để làm giao diện.
> 
> Sử dụng Java Spring Boot để làm máy chủ.
> 
> Sử dụng Microsoft SQL Server làm databasse để lưu trữ các thông tin cho việc quản lý sao lưu dữ liệu.

## Yêu cầu môi trường

- [Node.js 22.12.0+](https://nodejs.org/en/download)
- [JDK 21](https://www.oracle.com/java/technologies/downloads/#java21)
- [Apache Maven 3.9.10](https://maven.apache.org/download.cgi) - [Hướng dẫn cài đặt Maven](https://phoenixnap.com/kb/install-maven-windows)
- [SQL Server](https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqblZ2eUpFYUpXTUo0TkFKSTJFcXIwOUhrT0Y1QXxBQ3Jtc0tscTV2UXhJellLeXhCR1RqOVRWcDZTckQzMmYxbDloMjhfa3V0SHhGUVVOSFd5UVRrVWZUeEJYN2hZQjQ4REJZV2w4bFRuT2lwbEhycm90ZXYtMDk0NVhJNTJDdllQczdfd2hUQlp1WFYwRTM4OUVBWQ&q=https%3A%2F%2Fgo.microsoft.com%2Ffwlink%2Fp%2F%3Flinkid%3D2215158%26clcid%3D0x409%26culture%3Den-us%26country%3Dus&v=WgEgFF-mVW0)
- [SQL Server Management Studio - SSMS](https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbFJjT1RuOWtmWk1sbTd0b20zQlE4eVJQVF9KQXxBQ3Jtc0tuYmM2bzlqc1hVTmp4NEFORG0xNDlEX3ZqR19SQzNsY3d5cldTVlhIZXlXN3pLTzFtazVuR0l2V3lPWmZyUm54U2ViMjN2N1FjNEV3aWFQRW4zMGNOMkpwemM3WGtGZXFOYkRXeEZRZzZCMzVPdWNVYw&q=https%3A%2F%2Faka.ms%2Fssms%2F21%2Frelease%2Fvs_SSMS.exe&v=WgEgFF-mVW0)
## Hướng dẫn chạy dự án

### 1. Clone dự án
```bash
git clone https://github.com/namsaber/Data-Backup-Management-System.git
```

### 2. Tạo database và data
- Mở SSMS
- Chạy file `data-backup-management-db.sql`

### 3. Thay đổi cấu hình SQL Server
- Truy cập file `application.properties` theo đường dẫn `server\src\main\resources`
- Thay đổi các thông tin phù hợp
```bash
spring.application.name=data-backup

# Microsoft SQL Server Configuration
spring.datasource.url=jdbc:sqlserver:/<SERVERNAME>:<PORT>;databaseName=DataBackupManagementDB;instance=<INSTANCE>;encrypt=true;trustServerCertificate=true
spring.datasource.username=<USERNAME>
spring.datasource.password=<PASSWORD>
spring.datasource.driver-class-name=com.microsoft.sqlserver.jdbc.SQLServerDriver

# JPA Setting
spring.jpa.hibernate.dll-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.SQLServerDialect

# Swagger Configuraion
springdoc.swagger-ui.path=/swagger-ui.html
```

### 4. Khởi động Server [http://localhost:8080](http://localhost:8080/swagger-ui/index.htm)
- Truy cập thư mục của server
```bash
cd server
```
- Khởi động Server
```bash
mvn spring-boot:run
```

### 5. Khởi động Client [http://localhost:5173/](http://localhost:5173/)
- Truy cập vào thư mục của client
```bash
cd client
```
- Khởi động Client
```bash
mpn run dev
```
