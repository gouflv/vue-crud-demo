# crud-example

Provide reusable `ListService` and `EditService` which abstract commons logic, and combine with the service consumer components, to make CRUD more efficient.

Note: 
It simply uses a singleton `Store` to assemble services, does not consider the lifecycle of a large data case. I still try to find an easy way that sync data and component's lifecycle, like `angular`.
