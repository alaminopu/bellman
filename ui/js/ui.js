let socket = new WebSocket("ws://localhost:8080");

socket.onopen = function (e) {
  const data = { msg: "folder path added" };
  socket.send(JSON.stringify(data));
};

socket.onmessage = function (event) {
  const row = JSON.parse(event.data);
  const tbody = $("table").find("tbody");
  const template = `<tr>
    <td class="px-6 py-4 whitespace-nowrap">
        <div class="flex items-center">
        <div class="ml-4">
            <div class="text-sm font-medium text-gray-900">${row.path}</div>
        </div>
        </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm text-gray-900">
        ${new Date(row.date).toLocaleString("en-US", { timeZone: "Europe/Amsterdam" })}
        </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
        <span
        class="
            px-2
            inline-flex
            text-xs
            leading-5
            font-semibold
            rounded-full
            bg-green-100
            text-green-800
        "
        >
        ${row.event}
        </span>
    </td>
    </tr>`;

  tbody.append(template);
};

socket.onclose = function (event) {
  if (event.wasClean) {
    console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    console.error("[close] Connection died");
  }
};

socket.onerror = function (error) {
  console.log(`[error] ${error.message}`);
};

// Folder selector

$(document).ready(function () {
  $("#add").on("click", function (e) {
    e.preventDefault();
    const folderPath = $("#folder").val();
    const data = { folderPath: folderPath, msg: "folder path added" };
    socket.send(JSON.stringify(data));
  });
});
