module.exports = function() {
  const createMockXHR = responseJSON => {
    const mockXHR = {
      open: jest.fn(),
      send: jest.fn(),
      readyState: 4,
      responseText: JSON.stringify(responseJSON || {})
    };
    return mockXHR;
  };
  const oldXMLHttpRequest = window.XMLHttpRequest;
  let mockXHR = null
  mockXHR = createMockXHR();
  window.XMLHttpRequest = jest.fn(() => mockXHR);
  return {
    oldXMLHttpRequest,
    mockXHR
  }  
}